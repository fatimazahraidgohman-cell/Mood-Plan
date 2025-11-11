// Citations motivationnelles
const motivationalQuotes = [
    "Chaque jour est une nouvelle page dans l'histoire de ta vie ✨",
    "Tu possèdes en toi la force d'affronter tous les défis 🌱",
    "Les petites avancées quotidiennes mènent aux grands succès 🌟",
    "Sois bienveillant(e) envers toi-même, tu fais de ton mieux 💝",
    "Ton bien-être est tout aussi important que tes réussites 🌼",
    "Prends le temps de respirer, tout arrive au moment parfait 🍃",
    "Tu es la personne la plus importante de ton propre voyage 🌈",
    "Chaque effort, aussi petit soit-il, te rapproche de tes rêves 💫",
    "Ta valeur ne dépend pas de ta productivité aujourd'hui 🌸",
    "C'est okay de prendre des pauses, tu le mérites 🌿"
];

// Fonction pour changer la citation
function newQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    document.getElementById('daily-quote').textContent = motivationalQuotes[randomIndex];
}

// Animation douce au chargement
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Espace Équilibre chargé avec sérénité');
    
    // Animation d'apparition progressive
    const elements = document.querySelectorAll('.feature-card, .hero-content');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Suivi des tâches (pour la page plan.html)
let completedTasks = 0;
let totalTasks = 2; // Commence avec 2 tâches par défaut

function toggleTask(button) {
    const row = button.closest('tr');
    const statusSpan = row.querySelector('.status');
    const taskContent = row.querySelector('.task-content');
    
    if (statusSpan.classList.contains('pending')) {
        statusSpan.textContent = 'Terminé 🌸';
        statusSpan.classList.remove('pending');
        statusSpan.classList.add('completed');
        button.textContent = 'Marquer en cours';
        taskContent.style.textDecoration = 'line-through';
        taskContent.style.color = '#888';
        completedTasks++;
        
        // Message de félicitations aléatoire
        const congratsMessages = [
            "Bravo ! 🌟",
            "Super travail ! 💫",
            "Tu avances bien ! 🌸",
            "Félicitations ! 🎉"
        ];
        const randomMsg = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
        document.getElementById('progress-message').textContent = randomMsg;
    } else {
        statusSpan.textContent = 'En cours';
        statusSpan.classList.remove('completed');
        statusSpan.classList.add('pending');
        button.textContent = 'Terminer';
        taskContent.style.textDecoration = 'none';
        taskContent.style.color = 'var(--texte-doux)';
        completedTasks--;
        document.getElementById('progress-message').textContent = "Chaque petite étape compte 🌱";
    }
    
    updateProgress();
}

function updateProgress() {
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressFill && progressPercentage) {
        progressFill.style.width = percentage + '%';
        progressPercentage.textContent = percentage + '%';
        
        // Couleurs douces pour la progression
        if (percentage === 100) {
            progressFill.style.background = 'var(--vert-doux)';
            document.getElementById('progress-message').textContent = "Semaine accomplie ! 🎊";
        } else if (percentage >= 50) {
            progressFill.style.background = 'var(--bleu-doux)';
        } else {
            progressFill.style.background = 'var(--rose-doux)';
        }
    }
}

// Fonctions pour ajouter/supprimer des tâches
function addNewTask() {
    const taskInput = document.getElementById('new-task-input');
    const daySelect = document.getElementById('task-day-select');
    
    const taskText = taskInput.value.trim();
    const selectedDay = daySelect.value;
    
    if (!taskText) {
        alert("Ajoute une description pour ta tâche 🌸");
        return;
    }
    
    const tasksContainer = document.getElementById('tasks-container');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${selectedDay}</td>
        <td class="task-content">${taskText}</td>
        <td><span class="status pending">En cours</span></td>
        <td>
            <button class="btn-small" onclick="toggleTask(this)">Terminer</button>
            <button class="btn-small delete-btn" onclick="deleteTask(this)">🗑</button>
        </td>
    `;
    
    tasksContainer.appendChild(newRow);
    totalTasks++;
    
    // Réinitialiser les champs
    taskInput.value = '';
    daySelect.value = 'Lundi';
    
    // Donner le focus au champ de saisie
    taskInput.focus();
    
    updateProgress();
}

function deleteTask(button) {
    const row = button.closest('tr');
    const statusSpan = row.querySelector('.status');
    
    // Si la tâche était complétée, diminuer le compteur
    if (statusSpan.classList.contains('completed')) {
        completedTasks--;
    }
    
    row.remove();
    totalTasks--;
    updateProgress();
}

// Sauvegarde des réflexions
function saveReflection() {
    const reflectionText = document.getElementById('reflection-text').value;
    if (reflectionText.trim()) {
        localStorage.setItem('weeklyReflection', reflectionText);
        alert("Tes réflexions sont sauvegardées 🌟");
    } else {
        alert("Écris tes pensées avant de sauvegarder 💝");
    }
}

// Charger les réflexions sauvegardées
document.addEventListener('DOMContentLoaded', function() {
    const savedReflection = localStorage.getItem('weeklyReflection');
    if (savedReflection) {
        document.getElementById('reflection-text').value = savedReflection;
    }
    
    // Initialiser la progression
    updateProgress();
});
