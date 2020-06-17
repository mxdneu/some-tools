const ele = document.getElementsByClassName('light')[0];

function light(type, time) {
    return new Promise((resolve, reject) => {
        ele.style.backgroundColor = type;
        setTimeout(() => {
            resolve()
        }, time);
    })
}

async function period() {
    while(1) {
        await light('red', 2000);
        await light('yellow', 1000);
        await light('green', 3000);
    }
}

period();