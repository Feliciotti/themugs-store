// -------------------- WEBSOCKETS CLIENT -----------------------------
const socket = io()

function showMssgs(data) {
    const html = data.map(e => {
        return (` <div>
        <strong style="color:blue">${e.title}</strong>
        <span style="color:brown">[${e.date}]:<span>
        <em style="color:green">${e.messages.message}</em>
            </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html
}

socket.on('server:mssg', newMssg => {
    showMssgs(newMssg)
})

const chat = document.querySelector('#chat')
if(chat){
    chat.addEventListener('submit', (e) => {
        e.preventDefault()
    
        let commentDate = new Date().toLocaleString()
        const mssg = {title: document.getElementById('user').value,
                        date: commentDate,
                        messages: {
                            message: document.getElementById('message').value
                        }
                    };
        socket.emit('client:mssg', mssg);
        chat.reset()
        return false
    })
}

//---------------------------------------------------------------------------