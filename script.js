class LoveNumberPuzzle {
    constructor() {
        // Инициализация Telegram Web App
        this.tg = window.Telegram.WebApp;
        this.initTelegramApp();
        
        // Остальная инициализация игры (как в оригинале)
        this.levels = this.generateLevels(30);
        this.MAX_LEVEL = this.levels.length;
        
        this.loveMessages = [
            "Ти - моє сонечко, що освітлює кожен мій день 🌞",
            // ... остальные сообщения из оригинала
        ];
        
        this.GRID_W = 5;
        this.GRID_H = 8;
        this.bonusCosts = { destroy: 5, shuffle: 10, explosion: 20 };
        
        this.currentLevel = 0;
        this.grid = [];
        this.selected = [];
        this.isDragging = false;
        this.chainNumbers = [];
        this.xp = 0;
        this.xpToNext = 10;
        this.maxNumber = 8;
        this.activeBonus = null;
        this.gameState = 'playing';
        this.messageCount = 0;
        
        this.createFloatingHearts();
        this.initializeEventListeners();
        this.showScreen('mainMenu');
        
        document.addEventListener('dblclick', (e) => e.preventDefault());
    }
    
    initTelegramApp() {
        // Инициализация Telegram Web App
        this.tg.expand();
        this.tg.enableClosingConfirmation();
        
        // Применяем тему Telegram
        this.applyTelegramTheme();
        
        // Обработчик изменения темы
        this.tg.onEvent('themeChanged', this.applyTelegramTheme.bind(this));
    }
    
    applyTelegramTheme() {
        // Применяем тему Telegram к элементам
        document.body.style.background = this.tg.themeParams.bg_color || 'linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%)';
        
        // Обновляем цвета согласно теме Telegram
        const primaryColor = this.tg.themeParams.button_color || '#e91e63';
        const textColor = this.tg.themeParams.text_color || '#880e4f';
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--text-color', textColor);
    }
    
    // Остальные методы игры из оригинала
    generateLevels(count) {
        const levels = [];
        let target = 64;
        let baseNumbers = [2, 4, 8];
        
        for (let i = 0; i < count; i++) {
            const level = {
                numbers: [...baseNumbers],
                target: target,
                newNumbers: this.generateNewNumbers(target),
                max: baseNumbers[baseNumbers.length - 1],
                xpToNext: 10 + Math.floor(i * 2.5)
            };
            
            levels.push(level);
            target *= 2;
            
            if (i % 3 === 2 && baseNumbers.length < 5) {
                baseNumbers.push(baseNumbers[baseNumbers.length - 1] * 2);
            }
            
            if (i >= 15 && baseNumbers.length < 6) {
                baseNumbers.push(baseNumbers[baseNumbers.length - 1] * 2);
            }
        }
        
        return levels;
    }
    
    // ... все остальные методы из оригинального скрипта ...
    
    initializeEventListeners() {
        // Main menu buttons
        document.getElementById('playBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showScreen('settings');
        });
        
        document.getElementById('aboutBtn').addEventListener('click', () => {
            this.showScreen('about');
        });
        
        // Home button in game screen
        document.getElementById('homeBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });
        
        // Back buttons
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });
        
        document.getElementById('backFromSettingsBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });
        
        document.getElementById('backFromAboutBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });
        
        // Victory screen buttons
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.hideVictoryScreen();
            this.startGame();
        });
        
        document.getElementById('closeWebAppBtn').addEventListener('click', () => {
            this.tg.close();
        });
        
        // Settings
        document.getElementById('saveSettingsBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });
        
        // Game buttons
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
        
        document.getElementById('bonus-destroy').addEventListener('click', () => this.activateBonus('destroy'));
        document.getElementById('bonus-shuffle').addEventListener('click', () => this.activateBonus('shuffle'));
        document.getElementById('bonus-explosion').addEventListener('click', () => this.activateBonus('explosion'));
        
        document.addEventListener('contextmenu', e => e.preventDefault());
    }
    
    // ... остальные методы игры ...
}

// Инициализация игры когда Telegram Web App готов
Telegram.WebApp.ready();
document.addEventListener('DOMContentLoaded', () => {
    new LoveNumberPuzzle();
});