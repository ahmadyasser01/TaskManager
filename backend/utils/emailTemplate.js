

export const exportEmailTemplate = (title,link)=>{
    const EmailHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .btn {
                    background-color: red;
                    width: 200px;
                    height: 20px;
                    border-radius: 6px;
                    padding:1rem;
                    text-align: center;
                    text-decoration: none;
                    color: white;
                }
            </style>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email</title>
        </head>
        <body>
            Hii 
            <h1>${title}</h1>
            <p>Or go to this link ${link}</p>
        </body>
        </html>`
return EmailHtml;
}