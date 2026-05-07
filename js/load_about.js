document.addEventListener('DOMContentLoaded', () => {

    // ==================== LOAD SCHOOL TEXT ====================
    fetch('data/about_de.txt')
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.text();
        })
        .then(text => {
            document.getElementById('school-text').innerHTML = `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
        })
        .catch(() => {
            document.getElementById('school-text').innerHTML = `<p>Willkommen in der Sportschule Tran.</p>`;
        });

    // ==================== TRAINERS DATA ====================
    const trainers = [
        {
            name: "Tri Tran",
            title: "Head Coach & Gründer",
            image: "images/trainers/tri.jpg",
            textFile: "data/trainers/tri_de.txt"
        },
        //{
        //    name: "Max Mustermann",
        //    title: "Senior Trainer",
        //    image: "images/trainers/max.jpg",
        //    textFile: "data/trainers/max.txt"
        //}
        // Add more trainers here
    ];

    const container = document.getElementById('trainers-container');

    trainers.forEach(trainer => {
        const trainerDiv = document.createElement('div');
        trainerDiv.className = 'trainer-card';

        // Fetch trainer text
        fetch(trainer.textFile)
            .then(res => res.ok ? res.text() : Promise.reject())
            .then(text => {
                trainerDiv.innerHTML = `
                    <div class="trainer-content">
                        <div class="trainer-text">
                            <h3>${trainer.name}</h3>
                            <h4>${trainer.title}</h4>
                            <p>${text.replace(/\n/g, '</p><p>')}</p>
                        </div>
                        <div class="trainer-image">
                            <img src="${trainer.image}" alt="${trainer.name}">
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                trainerDiv.innerHTML = `
                    <div class="trainer-content">
                        <div class="trainer-text">
                            <h3>${trainer.name}</h3>
                            <h4>${trainer.title}</h4>
                            <p>Trainerbeschreibung wird noch hinzugefügt.</p>
                        </div>
                        <div class="trainer-image">
                            <img src="${trainer.image}" alt="${trainer.name}">
                        </div>
                    </div>
                `;
            });

        container.appendChild(trainerDiv);
    });
});