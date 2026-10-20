// --- SESLER ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); 
    const gain = audioCtx.createGain();
    osc.connect(gain); 
    gain.connect(audioCtx.destination);
    
    if (type === 'tick') {
        osc.type = 'triangle'; 
        osc.frequency.setValueAtTime(600, audioCtx.currentTime); 
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime); 
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.start(); 
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'drop') {
        osc.type = 'sine'; 
        osc.frequency.setValueAtTime(200, audioCtx.currentTime); 
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime); 
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); 
        osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'win') {
        [400, 500, 600, 800].forEach((f, i) => {
            const o = audioCtx.createOscillator(); 
            const g = audioCtx.createGain(); 
            o.connect(g); 
            g.connect(audioCtx.destination);
            o.frequency.value = f; 
            g.gain.setValueAtTime(0.1, audioCtx.currentTime + i * 0.1); 
            g.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.1 + 0.2);
            o.start(audioCtx.currentTime + i * 0.1); 
            o.stop(audioCtx.currentTime + i * 0.1 + 0.2);
        });
    } else if (type === 'boom') { 
        // Yeni Patlama Sesi (Kutu Açılırken)
        osc.type = 'square'; 
        osc.frequency.setValueAtTime(100, audioCtx.currentTime); 
        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime); 
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        osc.start(); 
        osc.stop(audioCtx.currentTime + 0.8);
    }
}

// --- VERİTABANI VE SORU ÜRETİCİ ---
function generate50Tasks(categoryName, presetType) {
    const tasks = [];
    for (let i = 1; i <= 50; i++) {
        if (presetType === 'degerler') tasks.push(`[${categoryName} - Görev ${i}]: "${categoryName}" değerini uyguladığın ${i}. somut örneği paylaş.`);
        else if (presetType === 'fen') tasks.push(`[${categoryName} - Soru ${i}]: "${categoryName}" konusuyla ilgili günlük yaşamdan bir örnek ver.`);
        else if (presetType === 'mat') tasks.push(`[${categoryName} - Soru ${i}]: "${categoryName}" kullanılarak çözülebilecek ${i}. bir problem uydur.`);
        else if (presetType === 'turkce') tasks.push(`[${categoryName} - Görev ${i}]: İçinde "${categoryName}" kuralları olan ${i}. yaratıcı cümleni kur.`);
        else if (presetType === 'sosyal') tasks.push(`[${categoryName} - Soru ${i}]: "${categoryName}" konusunun günümüz dünyasına ${i}. etkisini anlat.`);
        else if (presetType === 'ingilizce') tasks.push(`[${categoryName} - Task ${i}]: Make a sentence using "${categoryName}" rules.`);
        else if (presetType === 'sanat') tasks.push(`[${categoryName} - Görev ${i}]: "${categoryName}" dendiğinde aklına gelen sanat eserini anlat.`);
        else if (presetType === 'kultur') tasks.push(`[${categoryName} - Soru ${i}]: "${categoryName}" alanında duyduğun ilginç bilgiyi paylaş.`);
        else tasks.push(`[${categoryName} - Görev ${i}]: "${categoryName}" kavramını teknolojiden anlamayan birine nasıl anlatırsın?`);
    }
    return tasks;
}

const rawPresets = {
    degerler: [{ name: "Adalet", points: 10 }, { name: "Sabır", points: 5 }, { name: "Dürüstlük", points: 15 }, { name: "Yardımseverlik", points: 10 }, { name: "Saygı", points: 5 }, { name: "Sevgi", points: 10 }, { name: "Sorumluluk", points: 20 }, { name: "Hoşgörü", points: 5 }, { name: "Vatanseverlik", points: 15 }, { name: "Alçakgönüllülük", points: 10 }, { name: "Cömertlik", points: 10 }, { name: "Merhamet", points: 15 }, { name: "Güven", points: 5 }, { name: "Empati", points: 10 }, { name: "Çalışkanlık", points: 15 }, { name: "Vefa", points: 10 }, { name: "Sadakat", points: 10 }, { name: "Edep", points: 20 }],
    turkce: [{ name: "Fiilimsiler", points: 15 }, { name: "Cümle Ögeleri", points: 20 }, { name: "Noktalama", points: 10 }, { name: "Yazım Kuralları", points: 10 }, { name: "Paragraf", points: 5 }, { name: "Anlam", points: 5 }, { name: "Atasözleri", points: 10 }, { name: "Deyimler", points: 10 }, { name: "Ses Olayları", points: 15 }, { name: "İsimler", points: 5 }, { name: "Sıfatlar", points: 10 }, { name: "Zamirler", points: 10 }, { name: "Zarflar", points: 15 }, { name: "Edat & Bağlaç", points: 10 }, { name: "Şiir", points: 20 }, { name: "Sanatlar", points: 15 }],
    mat: [{ name: "Çarpanlar", points: 15 }, { name: "Üslü İfadeler", points: 10 }, { name: "Kareköklü", points: 15 }, { name: "Veri Analizi", points: 5 }, { name: "Olasılık", points: 10 }, { name: "Cebirsel", points: 20 }, { name: "Denklemler", points: 15 }, { name: "Eşitsizlikler", points: 10 }, { name: "Üçgenler", points: 15 }, { name: "Benzerlik", points: 10 }, { name: "Dönüşüm", points: 5 }, { name: "Cisimler", points: 15 }, { name: "Orantı", points: 5 }, { name: "Yüzdeler", points: 10 }, { name: "Rasyonel", points: 10 }, { name: "Tam Sayılar", points: 5 }],
    fen: [{ name: "Hücre", points: 10 }, { name: "Kuvvet", points: 15 }, { name: "Madde", points: 5 }, { name: "Işık & Ses", points: 10 }, { name: "DNA", points: 20 }, { name: "Periyodik", points: 15 }, { name: "Makineler", points: 10 }, { name: "Elektrik", points: 10 }, { name: "Asit/Baz", points: 15 }, { name: "Sistemler", points: 5 }, { name: "Ekosistem", points: 10 }, { name: "Basınç", points: 15 }, { name: "Isı", points: 10 }, { name: "Güneş Sis.", points: 5 }, { name: "Atom", points: 10 }],
    sosyal: [{ name: "İlk Türkler", points: 10 }, { name: "Osmanlı", points: 15 }, { name: "İnkılap", points: 20 }, { name: "İklimler", points: 5 }, { name: "Yeryüzü", points: 10 }, { name: "Nüfus", points: 5 }, { name: "Yönetim", points: 10 }, { name: "İnsan Hakları", points: 15 }, { name: "Sorunlar", points: 20 }, { name: "Ekonomi", points: 10 }, { name: "Demokrasi", points: 15 }, { name: "Milli Müc.", points: 20 }, { name: "Afetler", points: 5 }, { name: "Harita", points: 10 }],
    ingilizce: [{ name: "Present Simple", points: 10 }, { name: "Continuous", points: 15 }, { name: "Past Tense", points: 20 }, { name: "Future", points: 10 }, { name: "Modals", points: 15 }, { name: "Pronouns", points: 5 }, { name: "Adjectives", points: 10 }, { name: "Adverbs", points: 10 }, { name: "Vocabulary", points: 15 }, { name: "Speaking", points: 20 }, { name: "Hobbies", points: 5 }, { name: "Animals", points: 10 }],
    bilisim: [{ name: "Algoritma", points: 15 }, { name: "Yapay Zeka", points: 20 }, { name: "Siber Güvenlik", points: 15 }, { name: "Donanım", points: 5 }, { name: "Yazılım", points: 10 }, { name: "Ağ", points: 10 }, { name: "Veri Tabanı", points: 15 }, { name: "Robotik", points: 20 }, { name: "3D", points: 10 }, { name: "Web", points: 10 }, { name: "Bulut", points: 10 }, { name: "Python", points: 15 }],
    sanat: [{ name: "Renkler", points: 10 }, { name: "Perspektif", points: 15 }, { name: "Rönesans", points: 20 }, { name: "Notalar", points: 5 }, { name: "Klasik Müzik", points: 15 }, { name: "Mimari", points: 15 }, { name: "Fotoğraf", points: 10 }, { name: "Bestekarlar", points: 15 }, { name: "Sinema", points: 10 }],
    kultur: [{ name: "Uzay", points: 15 }, { name: "Bilim İnsanları", points: 20 }, { name: "İcatlar", points: 10 }, { name: "Keşifler", points: 15 }, { name: "Mitoloji", points: 20 }, { name: "Harikalar", points: 15 }, { name: "Felsefe", points: 20 }, { name: "Nobel", points: 15 }, { name: "Spor", points: 10 }]
};

let activeSlices = []; 
let totalScore = 0; 
let selectedSliceIndex = -1;
const sliceColors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b"];

function changePreset() {
    const presetKey = document.getElementById("presetSelect").value;
    activeSlices = rawPresets[presetKey].map((item, idx) => ({
        name: item.name, 
        points: item.points, 
        color: sliceColors[idx % sliceColors.length], 
        tasks: generate50Tasks(item.name, presetKey)
    }));
    drawWheel();
}

// --- SOL MENÜ GEÇİŞ ---
function setMode(modeId, btn) {
    document.querySelectorAll('.game-mode').forEach(el => el.classList.remove('active'));
    document.getElementById('mode-' + modeId).classList.add('active');
    document.querySelectorAll('.mode-btn').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
}

// --- 1. ÇARKIFELEK İŞLEMLERİ ---
const canvas = document.getElementById("wheelCanvas"); 
const ctx = canvas.getContext("2d"); 
const radius = canvas.width / 2;
let currentAngle = 0; 
let isSpinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (activeSlices.length === 0) { 
        ctx.fillStyle = "#fff"; 
        ctx.font = "bold 20px Segoe UI"; 
        ctx.textAlign = "center"; 
        ctx.fillText("Tüm dilimler tamamlandı!", radius, radius); 
        return; 
    }
    const arcSize = (2 * Math.PI) / activeSlices.length;
    for (let i = 0; i < activeSlices.length; i++) {
        const angle = currentAngle + i * arcSize;
        ctx.beginPath(); 
        ctx.moveTo(radius, radius); 
        ctx.arc(radius, radius, radius - 10, angle, angle + arcSize);
        ctx.fillStyle = activeSlices[i].color; 
        ctx.fill(); 
        ctx.lineWidth = 2; 
        ctx.strokeStyle = "rgba(255,255,255,0.3)"; 
        ctx.stroke();
        
        ctx.save(); 
        ctx.translate(radius, radius); 
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right"; 
        ctx.fillStyle = "#ffffff"; 
        ctx.font = "bold 13px Segoe UI"; 
        ctx.shadowColor = "rgba(0, 0, 0, 0.6)"; 
        ctx.shadowBlur = 4;
        ctx.fillText(`${activeSlices[i].name} (${activeSlices[i].points}P)`, radius - 25, 5); 
        ctx.restore();
    }
}

function spin() {
    if (isSpinning || activeSlices.length === 0) return;
    isSpinning = true; 
    const spinDuration = 5000; 
    const startAngle = currentAngle;
    const totalRotation = (5 + Math.random() * 5) * 2 * Math.PI; 
    const startTime = performance.now(); 
    let lastTick = currentAngle;

    function animateSpin(currentTime) {
        const progress = Math.min((currentTime - startTime) / spinDuration, 1);
        currentAngle = startAngle + (1 - Math.pow(1 - progress, 4)) * totalRotation; 
        drawWheel();
        
        const arcSize = (2 * Math.PI) / activeSlices.length;
        if (Math.floor(currentAngle / arcSize) !== Math.floor(lastTick / arcSize)) { 
            playSound('tick'); 
            lastTick = currentAngle; 
        }
        
        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else { 
            isSpinning = false; 
            triggerResult((2 * Math.PI - (currentAngle % (2 * Math.PI)) + 1.5 * Math.PI) % (2 * Math.PI)); 
        }
    }
    requestAnimationFrame(animateSpin);
}

// --- 2. TREN MACERASI İŞLEMLERİ ---
function startTrain() {
    if (activeSlices.length === 0) return alert("Bütün konular çözüldü!");
    const train = document.getElementById("trainIcon"); 
    const box = document.getElementById("trainBox"); 
    const btn = document.getElementById("trainBtn");
    
    btn.style.display = "none"; 
    box.classList.remove("falling"); 
    box.classList.remove("opening"); 
    train.style.transition = "none"; 
    train.classList.remove("go");
    
    setTimeout(() => {
        train.style.transition = "transform 3.5s cubic-bezier(0.25, 0.1, 0.25, 1)"; 
        train.classList.add("go");
        setTimeout(() => { 
            box.classList.add("falling"); 
            playSound('drop'); 
        }, 2200);
    }, 50);
}

// YENİ ANIMASYON: Kutuyu Aç ve Yakınlaştır (Zoom)
function openTrainBoxWithAnim() {
    if (activeSlices.length === 0) return;
    const box = document.getElementById("trainBox");
    const screen = document.getElementById("mainGameScreen");
    const flash = document.getElementById("flashScreen");

    // 1. Ekranı Zoomla
    screen.classList.add("zoomed");
    
    // 2. Zoom bitince kutuyu patlat
    setTimeout(() => {
        playSound('boom');
        box.classList.add("opening"); // Kutu büyüyüp şeffaflaşır (patlar)
        flash.classList.add("flash"); // Beyaz parlama efekti
        
        // 3. Parlama geçtikten sonra soruyu getir
        setTimeout(() => {
            flash.classList.remove("flash");
            triggerResult(Math.random() * 2 * Math.PI); // Rastgele Açıdan Soru Seçimi
        }, 500);
    }, 1000); // 1 Saniyelik zoom animasyon süresini bekler
}

// --- 3. GİZEMLİ KUTU İŞLEMLERİ ---
function shakeBox() {
    if (activeSlices.length === 0) return alert("Bütün konular çözüldü!");
    const box = document.getElementById("mBox");
    box.classList.add("shake"); 
    playSound('tick');
    
    setTimeout(() => { 
        box.classList.remove("shake"); 
        triggerResult(Math.random() * 2 * Math.PI); 
    }, 600);
}

// --- ORTAK SORU MODALI ---
function triggerResult(calculatedAngle) {
    const arcSize = (2 * Math.PI) / activeSlices.length;
    selectedSliceIndex = Math.floor(calculatedAngle / arcSize) % activeSlices.length;
    const selected = activeSlices[selectedSliceIndex];
    
    totalScore += selected.points; 
    document.getElementById("totalScore").innerText = totalScore;
    
    const taskIndex = Math.floor(Math.random() * selected.tasks.length);
    const chosenTask = selected.tasks[taskIndex];
    selected.tasks.splice(taskIndex, 1); // Çıkan soruyu sil (bir daha çıkmasın)

    document.getElementById("modalCategoryTag").innerText = document.getElementById("presetSelect").selectedOptions[0].text;
    document.getElementById("modalTitle").innerText = selected.name;
    document.getElementById("modalPoints").innerText = `🎯 Kazanılan: +${selected.points} Puan`;
    document.getElementById("modalTask").innerText = chosenTask;

    playSound('win'); 
    document.getElementById("resultModal").classList.add("active");
}

// Modal Butonları
function removeCurrentSlice() { 
    if (selectedSliceIndex !== -1) { 
        activeSlices.splice(selectedSliceIndex, 1); 
        selectedSliceIndex = -1; 
        drawWheel(); 
    } 
    closeModal(); 
}

function closeModal() { 
    document.getElementById("resultModal").classList.remove("active"); 
    
    // Ekran Zoomunu Sıfırla (Tren Animasyonundan sonra)
    const screen = document.getElementById("mainGameScreen");
    if (screen && screen.classList.contains("zoomed")) {
        screen.classList.remove("zoomed");
        document.getElementById("trainBtn").style.display = "block"; 
        document.getElementById("trainBox").classList.remove("falling");
        document.getElementById("trainBox").classList.remove("opening");
    }
}

// Sayfa yüklendiğinde varsayılan kategoriyi başlat
window.onload = () => { 
    changePreset(); 
};
