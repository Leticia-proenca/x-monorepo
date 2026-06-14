import PDFDocument from "pdfkit";
import type { ScreeningResult, Sex } from "../generated/prisma/index.js";

export type EvaluationPdfData = {
  sessionNumber: number;
  assessmentDate: Date;
  score: number | null;
  screeningResult: ScreeningResult | null;
  appliedThreshold: number | null;
  patient: { name: string; sex: Sex; birthDate: Date };
  symptoms: { name: string; isPresent: boolean }[];
};

export const pdfService = {
  generateReportPdf(data: any, professionalName: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        doc
          .fontSize(20)
          .text("Fragile-X Screening Report", { align: "center" });
        doc.moveDown();
        doc.fontSize(10).text(`Gerado em: ${new Date().toLocaleString()}`);
        doc.text(`Solicitado por: ${professionalName}`);
        doc.moveDown();

        doc.fontSize(14).text("Filtros Aplicados:", { underline: true });
        doc.fontSize(10).text(JSON.stringify(data.filtros, null, 2));
        doc.moveDown();

        doc.fontSize(14).text("Resumo de Avaliações:", { underline: true });
        doc.fontSize(12).text(`Total: ${data.totais.total}`);
        doc.text(`Suspeitos (Alto Risco): ${data.totais.suspeito}`);
        doc.text(`Baixo Risco: ${data.totais.baixo_risco}`);
        doc.moveDown();

        doc.fontSize(14).text("Incidência de Sintomas:", { underline: true });
        data.incidenciaSintomas.forEach((s: any) => {
          doc.fontSize(10).text(`- ${s.nome}: ${s.ocorrencias} ocorrência(s)`);
        });

        const hash = Buffer.from(JSON.stringify(data.totais)).toString(
          "base64",
        );
        doc
          .fontSize(8)
          .text(`Traceability Hash: ${hash}`, 50, doc.page.height - 50, {
            align: "center",
          });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  },

  generateEvaluationPdf(data: EvaluationPdfData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        const resultadoLabel =
          data.screeningResult === "suspected"
            ? "SUSPEITO"
            : data.screeningResult === "low_risk"
              ? "BAIXO RISCO"
              : "—";
        const sexoLabel = data.patient.sex === "m" ? "Masculino" : "Feminino";
        const nascimento = data.patient.birthDate.toISOString().slice(0, 10);

        doc.fontSize(20).text("Triagem X Frágil — Resultado da Avaliação", {
          align: "center",
        });
        doc.moveDown();
        doc
          .fontSize(10)
          .text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`);
        doc.moveDown();

        doc.fontSize(14).text("Paciente", { underline: true });
        doc.fontSize(11).text(`Nome: ${data.patient.name}`);
        doc.text(`Sexo: ${sexoLabel}`);
        doc.text(`Data de nascimento: ${nascimento}`);
        doc.text(`Nº da sessão: ${data.sessionNumber}`);
        doc.text(
          `Data da avaliação: ${data.assessmentDate.toLocaleString("pt-BR")}`,
        );
        doc.moveDown();

        doc.fontSize(14).text("Resultado", { underline: true });
        doc.fontSize(12).text(`Resultado: ${resultadoLabel}`);
        doc.text(`Score: ${data.score ?? "—"}`);
        doc.text(`Limiar aplicado: ${data.appliedThreshold ?? "—"}`);
        doc.moveDown();

        doc.fontSize(14).text("Sintomas avaliados", { underline: true });
        data.symptoms.forEach((s) => {
          doc.fontSize(10).text(`[${s.isPresent ? "X" : " "}] ${s.name}`);
        });

        const hash = Buffer.from(
          `${data.score}-${data.appliedThreshold}-${data.assessmentDate.toISOString()}`,
        ).toString("base64");
        doc
          .fontSize(8)
          .text(`Hash: ${hash}`, 50, doc.page.height - 50, { align: "center" });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  },
};
