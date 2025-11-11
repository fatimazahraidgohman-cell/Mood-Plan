// Journal prompts et messages de soutien
const journalPrompts = [
    "Qu'est-ce qui t'a fait sourire aujourd'hui ?",
    "De quoi es-tu fier(ère) en ce moment ?",
    "Quel défi as-tu surmonté récemment ?",
    "Qu'est-ce qui te préoccupe en ce moment ?",
    "Quel petit moment de bonheur as-tu vécu aujourd'hui ?",
    "Qu'as-tu appris sur toi-même cette semaine ?",
    "Quel est ton objectif bien-être pour demain ?",
    "Qu'est-ce qui te rend reconnaissant(e) aujourd'hui ?",
    "Comment pourrais-tu être plus doux(ce) avec toi-même ?",
    "Quelle qualité apprécies-tu chez toi ?"
];

const supportMessages = {
    heureux: "Quelle belle énergie ! N'oublie pas de célébrer ces moments de bonheur. 🌈 Profite de cette joie et partage-la autour de toi.",
    triste: "Il est normal de se sentir ainsi. Prends le temps dont tu as besoin, je suis là pour toi. 💝 Les émotions difficiles passent, comme les nuages dans le ciel.",
    energique: "Quelle motivation inspirante ! 💪 Profite de cette énergie pour avancer dans tes projets, mais n'oublie pas de t'hydrater et de prendre des pauses.",
    calme: "Cette sérénité est précieuse. 🍃 Écoute ton corps et ton esprit, cette paix intérieure est un cadeau à chérir.",
    anxieux: "Respire profondément. Tu as surmonté tant d'épreuves déjà, tu es plus fort(e) que tu ne le penses. 🌱 Prends un moment pour te recentrer.",
    fier: "Félicitations ! Tu mérites de reconnaître tes accomplissements. 🌟 Sois fier(ère) du chemin parcouru, chaque étape compte."
};

let selectedMood = null;

// Sélection d'humeur
function selectMood(element) {
    // Désélectionner toutes les options
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Sélectionner la nouvelle option
    element.classList.add('selected');
    selectedMood = element.getAttribute('data-mood');
    
    // Mettre à jour le message de soutien
    updateSupportMessage();
}

// Mise à jour du message de soutien
function updateSupportMessage() {
    if (selectedMood && supportMessages[selectedMood]) {
        document.getElementById('support-message').innerHTML = 
            <p>${supportMessages[selectedMood]}</p>;
    }
}

// Nouvelle question aléatoire
function newPrompt() {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    document.getElementById('journal-prompt').textContent = journalPrompts[randomIndex];
}

// Sauvegarde d'une entrée de journal
function saveJournalEntry() {
    const journalText = document.getElementById('journal-text').value;
    const prompt = document.getElementById('journal-prompt').textContent;
    
    if (!journalText.trim()) {
        alert("Prends un moment pour écrire tes pensées 💝");
        return;
    }
    
    if (!selectedMood) {
        alert("Choisis comment tu te sens aujourd'hui 🌸");
        return;
    }
    
    // Créer l'objet entrée
    const entry = {
        date: new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        mood: selectedMood,
        text: journalText,
        prompt: prompt
    };
    
    // Sauvegarder dans le stockage local
    saveEntryToStorage(entry);
    
    // Ajouter à l'affichage
    addEntryToDisplay(entry);
    
    // Réinitialiser le formulaire
    document.getElementById('journal-text').value = '';
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    selectedMood = null;
    
    // Nouveau prompt
    newPrompt();
    
    // Message de confirmation
    showConfirmationMessage();
}

function showConfirmationMessage() {
    const messages = [
        "Merci d'avoir partagé tes pensées 🌼",
        "Ton entrée est sauvegardée avec soin 💫",
        "Prends soin de ces précieuses réflexions 🌸",
        "Merci de prendre ce temps pour toi 🌿"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

// Sauvegarde dans le localStorage
function saveEntryToStorage(entry) {
    let entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.unshift(entry); // Ajouter au début
    // Garder seulement les 50 dernières entrées
    if (entries.length > 50) {
        entries = entries.slice(0, 50);
    }
    localStorage.setItem('journalEntries', JSON.stringify(entries));
}

// Affichage d'une entrée
function addEntryToDisplay(entry) {
    const entriesContainer = document.getElementById('entries-container');
    
    const entryElement = document.createElement('div');
    entryElement.className = 'entry-card';
    entryElement.innerHTML = `
        <div class="entry-date">📅 ${entry.date}</div>
        <div class="entry-mood">Humeur: ${entry.mood}</div>
        <p><strong>Question:</strong> ${entry.prompt}</p>
        <p class="entry-text">${entry.text}</p>
    `;
    
    // Animation d'apparition
    entryElement.style.opacity = '0';
    entryElement.style.transform = 'translateY(20px)';
    
    entriesContainer.prepend(entryElement);
    
    // Animation
    setTimeout(() => {
        entryElement.style.transition = 'all 0.5s ease';
        entryElement.style.opacity = '1';
        entryElement.style.transform = 'translateY(0)';
    }, 100);
}

// Chargement des entrées précédentes
function loadPreviousEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.forEach(entry => addEntryToDisplay(entry));
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadPreviousEntries();
    newPrompt(); // Premier prompt aléatoire
    
    console.log('📖 Journal des émotions prêt à accueillir tes pensées');
});
