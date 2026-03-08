/**
 * Mapping (ETL - Data transformation)
 * -> Transforms the received payload from pt-br to the en schema of the database
 */

const mapOrderInputToDb = (orderData) => {
    if (!orderData) return null;

    return {
        // numeroPedido -> orderId
        orderId: orderData.numeroPedido,

        // valorTotal -> value
        value: orderData.valorTotal,

        // Converts the creation date to the ISO (Z) standard; if no date is provided, uses the current date as a fallback
        creationDate: orderData.dataCriacao
            ? new Date(orderData.dataCriacao).toISOString()
            : new Date().toISOString(),

        // Maps the array of items
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
