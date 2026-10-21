// --- SES SİSTEMİ ---
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
        osc.type = 'square'; 
        osc.frequency.setValueAtTime(100, audioCtx.currentTime); 
        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime); 
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        osc.start(); 
        osc.stop(audioCtx.currentTime + 0.8);
    }
}

// --- DİN KÜLTÜRÜ 50 GÖREV ÜRETİCİ ---
function generate50Tasks(categoryName, customFirstTask) {
    const tasks = [];
    
    // Eğer biz özel bir görev yazdıysak onu 1. sıraya ekle
    if (customFirstTask && customFirstTask.trim() !== "") {
        tasks.push(`[${categoryName} - Görev 1]: ${customFirstTask}`);
    } else {
        if (categoryName.includes("Eşitlik") || categoryName.includes("Adalet")) {
            tasks.push(`[${categoryName} - Görev 1]: Bugün arkadaşlarına veya kardeşlerine eşit miktarda yemek/ikram dağıt ve adil davran.`);
        } else if (categoryName.includes("Yardımseverlik") || categoryName.includes("Sadaka")) {
            tasks.push(`[${categoryName} - Görev 1]: Bugün bir arkadaşına yardıma ihtiyacı olduğu bir konuda destek ol veya bir hayır yap.`);
        } else if (categoryName.includes("Dürüstlük")) {
            tasks.push(`[${categoryName} - Görev 1]: Bugün gün boyunca ne olursa olsun dürüst olmaya ve doğruyu söylemeye özen göster.`);
        } else {
            tasks.push(`[${categoryName} - Görev 1]: "${categoryName}" bilinciyle bugün çevrendeki insanlara faydalı bir adım at.`);
        }
    }

    // Geri kalan 49 soruyu şablonlardan rastgele seçerek tamamla
    const actionTemplates = [
        `Bugün sınıfta veya evde "${categoryName}" ilkesini uyguladığın somut bir davranışı arkadaşlarınla paylaş.`,
        `Peygamberimizin "${categoryName}" ile ilgili bir hadis-i şerifini öğrenip bir arkadaşına anlat.`,
        `Bugün gün boyunca insanlara güler yüz göstererek sadaka sevabı kazan.`,
        `Ailenden veya arkadaşlarından biriyle "${categoryName}" üzerine kısa bir sohbet et.`,
        `Bugün çevrendeki bir insanın yükünü hafifletecek somut bir kolaylık sağla.`,
        `Peygamber Efendimizin hayatından "${categoryName}" konusuna örnek teşkil eden bir olayı araştır.`,
        `Bugün bir insana veya hayvana merhametle muamele ederek ne hissettiğini yaz.`,
        `Sofraya oturmadan ve kalktıktan sonra ellerini yıkayıp şükretmeyi unutma.`,
        `Bugün bir arkadaşına güzel bir söz söyleyerek gönlünü al.`,
        `Çevrendeki ve doğadaki nimetlere dikkat ederek bugün israftan kaçın.`,
        `İki arkadaşın arasında herhangi bir anlaşmazlık olursa adil ve eşit bir hakem ol.`,
        `Bugün kul hakkına girmemek için sıraya girerken ve konuşurken hakk gözettiğine emin ol.`
    ];

    while (tasks.length < 50) {
        const idx = tasks.length + 1;
        const template = actionTemplates[(idx - 2) % actionTemplates.length];
        tasks.push(`[${categoryName} - Görev ${idx}]: ${template}`);
    }

    return tasks;
}

// DIN KÜLTÜRÜ VERİ TABANI
let rawPresets = {
    din_kulturu: [
        { name: "Eşitlik & Adalet", points: 15, customTask: "Bugün arkadaşlarına veya kardeşlerine eşit miktarda yemek/ikram dağıt." },
        { name: "Dürüstlük & Doğruluk", points: 10, customTask: "Bugün ne olursa olsun yalan söylemeyeceğine ve dürüst kalacağına söz ver." },
        { name: "Yardımseverlik", points: 15, customTask: "Bugün yardıma ihtiyacı olan bir arkadaşına veya büyüğüne yardım et." },
        { name: "Anne-Babaya Saygı", points: 20, customTask: "Bugün annene veya babana güler yüzle sarılıp yardıma ihtiyacı olup olmadığını sor." },
        { name: "Merhamet & Şefkat", points: 10, customTask: "Bugün sokaktaki bir hayvana veya bir cana merhametle yaklaş, su/yemek ver." },
        { name: "Temizlik (Taharet)", points: 10, customTask: "Bugün çevreni, sıranı ve odanı tertemiz tut, temizliğin imandan geldiğini hatırla." },
        { name: "Sabır & Şükür", points: 15, customTask: "Bugün karşılaştığın zor bir durumda öfkelenmeyip sabret ve sahip olduklarına şükret." },
        { name: "Hoşgörü & Müsamaha", points: 10, customTask: "Bugün sana yapılan küçük bir hatayı hoşgörüyle karşıla ve affedici ol." },
        { name: "Sorumluluk & Emanet", points: 15, customTask: "Sana verilen bir eşyayı veya görevi en güzel şekilde koruyup yerine getir." },
        { name: "Kardeşlik & Birlik", points: 20, customTask: "Bugün küs olduğun veya az konuştuğun bir arkadaşına selam verip barış." },
        { name: "Cömertlik & Paylaşma", points: 15, customTask: "Bugün sahip olduğun imkanlardan veya eşyalardan birini arkadaşınla paylaş." },
        { name: "Kul Hakkı", points: 20, customTask: "Bugün kimsenin sırasını gasp etme, arkasından konuşma ve kul hakkından kaçın." }
    ],
    din_ibadet: [
        { name: "Namaz & İbadet", points: 20, customTask: "Bugün ibadetlerin insan ruhuna kazandırdığı huzuru düşün ve bir ibadet duasını oku." },
        { name: "Dua Etmek", points: 15, customTask: "Bugün hem kendin hem de tüm sevdiklerin ve mazlumlar için içtenlikle dua et." },
        { name: "Kuran-ı Kerim", points: 20, customTask: "Kuran-ı Kerim'den Türkçe mealiyle bir ayet okuyup anlamı üzerine düşün." },
        { name: "Güvenilirlik (El-Emin)", points: 15, customTask: "Peygamberimizin El-Emin sıfatını örnek alarak bugün sözünde dur." },
        { name: "Selamlaşmak", points: 10, customTask: "Bugün karşılaştığın en az 5 kişiye içtenlikle 'Selamün Aleyküm' de ve selam ver." },
        { name: "İsraftan Kaçınmak", points: 15, customTask: "Bugün tabağındaki yemeği bitir, suyu boşa akıtma ve israftan kaçın." }
    ]
};

let activeSlices = []; 
let totalScore = 0; 
let selectedSliceIndex = -1;
const sliceColors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"];

function changePreset() {
    const presetKey = document.getElementById("presetSelect").value;
    activeSlices = rawPresets[presetKey].map((item, idx) => ({
        name: item.name, 
        points: item.points, 
        color: sliceColors[idx % sliceColors.length], 
        tasks: generate50Tasks(item.name, item.customTask)
    }));
    drawWheel();
}

// --- KULLANICI YENİ KONU VE GÖREV EKLEME ---
function addNewCustomTopic() {
    const topicName = document.getElementById("newTopicName").value.trim();
    const topicPoints = parseInt(document.getElementById("newTopicPoints").value) || 10;
    const customTask = document.getElementById("newTopicCustomTask").value.trim();

    if (!topicName) {
        alert("Lütfen bir konu adı girin! (Örn: Eşitlik)");
        return;
    }

    const newSlice = {
        name: topicName,
        points: topicPoints,
        color: sliceColors[activeSlices.length % sliceColors.length],
        tasks: generate50Tasks(topicName, customTask)
    };

    activeSlices.push(newSlice);
    
    // Eklendikten sonra kutuları temizle
    document.getElementById("newTopicName").value = "";
    document.getElementById("newTopicCustomTask").value = "";

    drawWheel();
    alert(`"${topicName}" konusu ve 50 özel görevi başarıyla çarka eklendi! 🎉`);
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
        ctx.fillText("Tüm konular tamamlandı!", radius, radius); 
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

// TREN KUTUSU AÇILMA ANİMASYONU (ZOOM + FLASH)
function openTrainBoxWithAnim() {
    if (activeSlices.length === 0) return;
    const box = document.getElementById("trainBox");
    const screen = document.getElementById("mainGameScreen");
    const flash = document.getElementById("flashScreen");

    screen.classList.add("zoomed");
    
    setTimeout(() => {
        playSound('boom');
        box.classList.add("opening");
        flash.classList.add("flash");
        
        setTimeout(() => {
            flash.classList.remove("flash");
            triggerResult(Math.random() * 2 * Math.PI);
        }, 500);
    }, 1000);
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

// --- ORTAK SORU/GÖREV MODALI ---
function triggerResult(calculatedAngle) {
    const arcSize = (2 * Math.PI) / activeSlices.length;
    selectedSliceIndex = Math.floor(calculatedAngle / arcSize) % activeSlices.length;
    const selected = activeSlices[selectedSliceIndex];
    
    totalScore += selected.points; 
    document.getElementById("totalScore").innerText = totalScore;
    
    // 50 sorudan rastgele birini seç
    const taskIndex = Math.floor(Math.random() * selected.tasks.length);
    const chosenTask = selected.tasks[taskIndex];
    
    // Çıkan soruyu listeden sil ki bir daha çıkmasın
    selected.tasks.splice(taskIndex, 1);

    document.getElementById("modalCategoryTag").innerText = document.getElementById("presetSelect").selectedOptions[0].text;
    document.getElementById("modalTitle").innerText = selected.name;
    document.getElementById("modalPoints").innerText = `🎯 Kazanılan: +${selected.points} Puan`;
    document.getElementById("modalTask").innerText = chosenTask;

    playSound('win'); 
    document.getElementById("resultModal").classList.add("active");
}

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
    const screen = document.getElementById("mainGameScreen");
    if (screen && screen.classList.contains("zoomed")) {
        screen.classList.remove("zoomed");
        document.getElementById("trainBtn").style.display = "block"; 
        document.getElementById("trainBox").classList.remove("falling");
        document.getElementById("trainBox").classList.remove("opening");
    }
}

// Sayfa yüklendiğinde varsayılan ayarları yükle
window.onload = () => { 
    changePreset(); 
};
