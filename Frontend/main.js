document.addEventListener("DOMContentLoaded", function () {
    const reminders = document.querySelectorAll("textarea");

    reminders.forEach((reminder, index) => {
        const savedReminder = localStorage.getItem(`reminder${index}`);
        const savedDone = localStorage.getItem(`done${index}`);
        const savedColor = localStorage.getItem(`color${index}`);
        const savedFontSize = localStorage.getItem(`fontSize${index}`);
        const savedFontColor = localStorage.getItem(`fontColor${index}`);

        if (savedReminder) {
            reminder.value = savedReminder;
        }

        if (savedDone === "true") {
            reminder.classList.add("done");
        }

        if (savedColor) {
            reminder.classList.add(savedColor);
        }

        if (savedFontSize) {
            reminder.style.fontSize = savedFontSize;
        }

        if (savedFontColor) {
            reminder.style.color = savedFontColor;
        }

        reminder.addEventListener("input", function () {
            localStorage.setItem(`reminder${index}`, reminder.value);
        });

        reminder.addEventListener("click", function () {
            const colors = ["reminder-blue", "reminder-pink", "reminder-green", "reminder-white"];
            for (const color of colors) {
                reminder.classList.remove(color);
            }
            const selectedColor = colors[Math.floor(Math.random() * colors.length)];
            reminder.classList.add(selectedColor);
            localStorage.setItem(`color${index}`, selectedColor);
        });

        const doneButton = document.createElement("button");
        doneButton.innerHTML = " ✔️";
        doneButton.addEventListener("click", function () {
            if (reminder.classList.contains("done")) {
                reminder.classList.remove("done");
                localStorage.setItem(`done${index}`, "false");
            } else {
                reminder.classList.add("done");
                localStorage.setItem(`done${index}`, "true");
            }
        });

        reminder.parentNode.appendChild(doneButton);
    });

    const obsButtons = document.querySelectorAll(".obs-button");

    obsButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            openObsPopup(button, index);
        });
    });

    function openObsPopup(obsButton, index) {
        const popup = document.querySelector('.popup');
        popup.style.display = 'block';

        const eventName = document.getElementById("eventName");
        const eventDate = document.getElementById("eventDate");
        const eventCategory = document.getElementById("eventCategory");
        const eventObservation = document.getElementById("eventObservation");
        const fontSizeInput = document.getElementById('fontSize');
        const fontColorSelect = document.getElementById('fontColor');

        eventName.value = localStorage.getItem(`eventName${index}`) || '';
        eventDate.value = localStorage.getItem(`eventDate${index}`) || '';
        eventCategory.value = localStorage.getItem(`eventCategory${index}`) || 'blue';
        eventObservation.value = localStorage.getItem(`eventObservation${index}`) || '';
        fontSizeInput.value = localStorage.getItem(`fontSize${index}`) || '16';
        fontColorSelect.value = localStorage.getItem(`fontColor${index}`) || 'black';

        const addEventButton = document.getElementById("addEventButton");

        addEventButton.addEventListener("click", function () {
            const event = {
                nome: eventName.value,
                data: eventDate.value,
                categoria: eventCategory.value,
                observacao: eventObservation.value,
                fontSize: fontSizeInput.value + 'px',
                fontColor: fontColorSelect.value,
                concluido: false
            };

            // Salvando dados do evento no localStorage
            localStorage.setItem(`eventName${index}`, event.nome);
            localStorage.setItem(`eventDate${index}`, event.data);
            localStorage.setItem(`eventCategory${index}`, event.categoria);
            localStorage.setItem(`eventObservation${index}`, event.observacao);
            localStorage.setItem(`fontSize${index}`, event.fontSize);
            localStorage.setItem(`fontColor${index}`, event.fontColor);

            popup.style.display = 'none';
        });
    }

    const fontSizeInput = document.getElementById('fontSize');
    const fontColorSelect = document.getElementById('fontColor');
    const eventObservation = document.getElementById('eventObservation');

    fontSizeInput.addEventListener('change', () => {
        const newSize = fontSizeInput.value + 'px';
        eventObservation.style.fontSize = newSize;
    });

    fontColorSelect.addEventListener('change', () => {
        const newColor = fontColorSelect.value;
        eventObservation.style.color = newColor;
    });

    const fecharPopupButton = document.getElementById("fecharPopupButton");

    fecharPopupButton.addEventListener("click", function () {
        const popup = document.querySelector('.popup');
        popup.style.display = 'none';
    });
});





