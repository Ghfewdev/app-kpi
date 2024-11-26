export default function SelectY(val) {

    fetch(import.meta.env.VITE_APP_API + `/form/year/${val}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setForms({ ...forms, form: data })
        })
}
