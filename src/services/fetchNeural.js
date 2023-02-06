const query = async (apiUrl, prompt) => {
    console.log('sending prompt...')
    const response = await fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json"
            // Authorization: `Bearer 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`
        },
        method: "POST",
        body: JSON.stringify({
            data: [prompt]
        })
    })
    console.log('response: ')
    console.log(response)
    if (response.ok) {
        const result = await response.json()
        return result
    } else {
        throw new Error('ошибка')
    }

}

export {query}