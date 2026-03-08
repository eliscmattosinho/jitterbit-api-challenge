/**
 * Mapeamento (ETL - Data transformation)
 * Transforma o payload recebido em português para o esquema em inglês do banco de dados
 */

const mapOrderInputToDb = (orderData) => {
    if (!orderData) return null;

    return {
        // numeroPedido -> orderId
        orderId: orderData.numeroPedido,

        // valorTotal -> value
        value: orderData.valorTotal,

        // Converte a data de criação para o padrão ISO (Z), caso não venha data, utiliza a data atual como fallback
        creationDate: orderData.dataCriacao
            ? new Date(orderData.dataCriacao).toISOString()
            : new Date().toISOString(),

        // Mapeia o array de itens
        items: Array.isArray(orderData.items)
            ? orderData.items.map((item) => ({
                productId: item.idItem,
                quantity: item.quantidadeItem,
                price: item.valorItem,
            }))
            : [],
    };
};

export default mapOrderInputToDb;
