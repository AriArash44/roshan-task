import Toastify from 'toastify-js';

export const showToast = (message: string) => {
    Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#FFFFFF",
            border: "1px solid #880000",
            color: "#880000",
            direction: "ltr",
            "border-radius": "5px"
        },
    }).showToast();
};