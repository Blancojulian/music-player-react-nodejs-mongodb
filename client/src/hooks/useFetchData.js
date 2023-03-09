
const URI = `https://prueba-sv-mp.blancojulian.repl.co/api/song`

const useFetchData = (url = URI) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async () => {

        try {

            const res = await fetch(url);
            const json = await res.json();

            if (res.ok) setData(json);


        } catch (err) {
            console.log(err + '\nError la data');
        }

    }

    useEffect(() => {

        fetchData();
        console.log('se fecheo la data');

    }, [setData])


    return {
        data,
        fetchData
    }
}