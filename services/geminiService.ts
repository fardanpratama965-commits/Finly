import { GoogleGenAI, Chat } from "@google/genai";
import { UserTier } from "../types";

const apiKey = process.env.API_KEY || '';

// Create a singleton instance wrapper to manage API key and chat sessions
class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn("Gemini API Key is missing in process.env.API_KEY");
    }
  }

  private getSystemInstruction(tier: UserTier): string {
    switch (tier) {
      case UserTier.BASIC:
        return `Anda adalah Finly Basic, asisten literasi keuangan yang ramah untuk pemilik UMKM atau pemula di Indonesia.
        Gunakan Bahasa Indonesia yang santai namun sopan. Hindari istilah teknis yang rumit.
        Fokus pada: Dasar-dasar arus kas, tips menabung, dan penganggaran sederhana.
        Jika ditanya hal rumit, jelaskan dengan analogi sehari-hari yang mudah dimengerti.`;
      
      case UserTier.PRO:
        return `Anda adalah Finly Pro, analis bisnis profesional untuk perusahaan menengah.
        Gunakan Bahasa Indonesia yang baku, profesional, dan berbasis data.
        Fokus pada: Analisis Break-even (BEP), optimasi biaya operasional (COGS), ROI pemasaran, dan draf email bisnis formal.
        Asumsikan pengguna mengerti dasar keuangan tapi butuh wawasan yang bisa dieksekusi (actionable insights).`;

      case UserTier.ENTERPRISE:
        return `Anda adalah Finly Enterprise, asisten strategis CFO untuk korporasi besar.
        Gunakan Bahasa Indonesia level eksekutif/korporat.
        Fokus pada: Peramalan prediktif (forecasting), manajemen risiko, skenario pasar global, kepatuhan (compliance), dan dampak makroekonomi.
        Berikan saran strategis tingkat tinggi, simulasi skenario, dan wawasan pelaporan terkonsolidasi.`;
      
      default:
        return "Anda adalah Finly, asisten keuangan yang membantu.";
    }
  }

  public async createChatSession(tier: UserTier): Promise<Chat | null> {
    if (!this.ai) return null;

    try {
      const chat = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: this.getSystemInstruction(tier),
          temperature: 0.7,
        },
      });
      return chat;
    } catch (error) {
      console.error("Failed to create chat session:", error);
      return null;
    }
  }

  public async sendImageMessage(chat: Chat, text: string, base64Image: string): Promise<string> {
    try {
      // 1. Clean Base64 Data
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      
      // 2. Define Contextual Prompt for Scanning
      // If user text is empty, provide a strong default prompt for OCR/Analysis
      const analysisPrompt = text || 
        `Tolong analisis gambar ini secara mendalam sebagai asisten keuangan. 
         - Jika ini struk/faktur: Ekstrak Nama Toko, Tanggal, Daftar Item, dan Total Pembayaran.
         - Jika ini grafik keuangan: Jelaskan tren utama, titik tertinggi/terendah, dan kesimpulannya.
         - Jika ini objek lain: Jelaskan relevansinya dengan nilai ekonomi atau bisnis.`;

      // 3. Construct Multimodal Message Parts
      // The SDK expects an array of parts for multimodal input
      const messageParts = [
        { text: analysisPrompt },
        { inlineData: { mimeType: "image/jpeg", data: base64Data } }
      ];
      
      // 4. Send Message
      const response = await chat.sendMessage(messageParts);
      
      return response.text || "Maaf, saya tidak dapat membaca data dari gambar tersebut. Pastikan gambar jelas.";
    } catch (error) {
      console.error("Image analysis failed:", error);
      return "Terjadi kesalahan saat memproses gambar. Coba upload ulang dengan resolusi yang lebih rendah atau format JPG/PNG.";
    }
  }

  public async generateImage(prompt: string): Promise<string | null> {
    if (!this.ai) return null;

    try {
      const response = await this.ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `High quality, photorealistic, 3D financial visualization, clean aesthetic, ${prompt}`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '4:3',
        },
      });

      const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
      if (base64ImageBytes) {
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      }
      return null;
    } catch (error) {
      console.error("Failed to generate image:", error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();