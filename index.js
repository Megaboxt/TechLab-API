
const BASE_URL = 'https://fakestoreapi.com'

const [metodo, ruta, ...args] = process.argv.slice(2) // Ignora los primeros 2 argumentos

// console.log(process.argv);

async function main() {
    try {
        if (metodo === 'GET' && ruta.startsWith('products')) {
            const [id] = ruta.split('/').slice(1) // extrae el id
            /* Si se le pasa ID trae solo ese product, sino trae la lista */
            const url = id ? `${BASE_URL}/products/${id}` : `${BASE_URL}/products`
            const res = await fetch(url)
            const data = await res.json()
            console.log('Obteniendo lista con método GET: ', data);

        } else if (metodo === 'POST' && ruta === 'products') {
            const [title, price, category] = args

            const newProduct = {
                title: title,
                price: Number(price),
                category: category
            }

            const res = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })

            const data = await res.json()
            console.log('Producto creado (POST): ', data);

        } else if (metodo === 'DELETE' && ruta.startsWith('products')) {
            const [id] = ruta.split('/').slice(1) // extrae el id
            if (!id) {
                console.error('Tenes que especificar un ID: npm run start DELETE products/<id>');
                return
            }
            const url = `${BASE_URL}/products/${id}`
            const res = await fetch(url, { method: 'DELETE' })
            const data = await res.json()
            console.log('Producto eliminado (DELETE)', data);
            
        } else {
            console.error("Comando no reconocido...");
            
        }
    } catch (error) {
        console.error("Error durante la ejecución: ", error.message);
    }
}

main()