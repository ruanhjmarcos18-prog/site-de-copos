class CambioService {
    static async obterCotacao(moedaAlvo) {
        try {
            const response = await fetch('https://open.er-api.com/v6/latest/BRL');
            if (!response.ok) throw new Error("Erro na comunicação com a API de Câmbio");
            const data = await response.json();
            const taxa = data.rates[moedaAlvo.toUpperCase()];
            if (!taxa) throw new Error("Moeda não suportada ou inválida");
            return taxa;
        } catch (error) {
            console.error("Erro no CambioService:", error);
            throw error;
        }
    }
}
module.exports = CambioService;
