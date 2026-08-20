const shareButton = document.querySelector("#shareButton");
const stopButton = document.querySelector("#stopButton");
const copyButton = document.querySelector("#copyButton");
const shareLink = document.querySelector("#shareLink");
const linkBox = document.querySelector("#linkBox");
const video = document.querySelector("#video");
const statusText = document.querySelector("#status");
const quickCard = document.querySelector("#quickCard");
const roomLabel = document.querySelector("#roomLabel");
const viewerCount = document.querySelector("#viewerCount");
const statsBox = document.querySelector("#statsBox");
const emptyState = document.querySelector("#emptyState");
const emptyTitle = document.querySelector("#emptyTitle");
const emptyHint = document.querySelector("#emptyHint");
const liveDot = document.querySelector("#liveDot");
const modeLabel = document.querySelector("#modeLabel");
const stageTitle = document.querySelector("#stageTitle");
const stageSubtitle = document.querySelector("#stageSubtitle");
const connectionBadge = document.querySelector("#connectionBadge");
const fullscreenButton = document.querySelector("#fullscreenButton");
const screenFrame = document.querySelector(".screen-frame");
const languageFlag = document.querySelector("#languageFlag");
const languageSelect = document.querySelector("#languageSelect");
const linkLabel = document.querySelector("#linkLabel");
const roomStatLabel = document.querySelector("#roomStatLabel");
const viewerStatLabel = document.querySelector("#viewerStatLabel");
const madeByNote = document.querySelector("#madeByNote");
const accountButton = document.querySelector("#accountButton");
const accountLabel = document.querySelector("#accountLabel");
const accountName = document.querySelector("#accountName");
const accountCtaEyebrow = document.querySelector("#accountCtaEyebrow");
const accountCtaTitle = document.querySelector("#accountCtaTitle");
const accountCtaText = document.querySelector("#accountCtaText");
const trialPanel = document.querySelector("#trialPanel");
const trialLabel = document.querySelector("#trialLabel");
const trialCountdown = document.querySelector("#trialCountdown");
const trialText = document.querySelector("#trialText");
const trialAccountLink = document.querySelector("#trialAccountLink");
const audiencePanel = document.querySelector("#audiencePanel");
const watchingNowLabel = document.querySelector("#watchingNowLabel");
const audienceList = document.querySelector("#audienceList");
const howToModal = document.querySelector("#howToModal");
const closeHowToButton = document.querySelector("#closeHowToButton");
const skipHowToButton = document.querySelector("#skipHowToButton");
const createAccountLink = document.querySelector("#createAccountLink");
const closeAuthButton = document.querySelector("#closeAuthButton");
const howToEyebrow = document.querySelector("#howToEyebrow");
const howToTitle = document.querySelector("#howToTitle");
const howToIntro = document.querySelector("#howToIntro");
const stepOneTitle = document.querySelector("#stepOneTitle");
const stepOneText = document.querySelector("#stepOneText");
const stepTwoTitle = document.querySelector("#stepTwoTitle");
const stepTwoText = document.querySelector("#stepTwoText");
const stepThreeTitle = document.querySelector("#stepThreeTitle");
const stepThreeText = document.querySelector("#stepThreeText");
const benefitHistoryTitle = document.querySelector("#benefitHistoryTitle");
const benefitHistoryText = document.querySelector("#benefitHistoryText");
const benefitUsernameTitle = document.querySelector("#benefitUsernameTitle");
const benefitUsernameText = document.querySelector("#benefitUsernameText");
const shell = document.querySelector(".shell");
const authView = document.querySelector("#authView");
const authEyebrow = document.querySelector("#authEyebrow");
const authTitle = document.querySelector("#authTitle");
const authIntro = document.querySelector("#authIntro");
const registerTab = document.querySelector("#registerTab");
const loginTab = document.querySelector("#loginTab");
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const profileForm = document.querySelector("#profileForm");
const registerNameLabel = document.querySelector("#registerNameLabel");
const usernameLabel = document.querySelector("#usernameLabel");
const usernameHint = document.querySelector("#usernameHint");
const registerEmailLabel = document.querySelector("#registerEmailLabel");
const registerPasswordLabel = document.querySelector("#registerPasswordLabel");
const loginEmailLabel = document.querySelector("#loginEmailLabel");
const loginPasswordLabel = document.querySelector("#loginPasswordLabel");
const profileNameLabel = document.querySelector("#profileNameLabel");
const profileUsernameLabel = document.querySelector("#profileUsernameLabel");
const profileUsernameHint = document.querySelector("#profileUsernameHint");
const registerButton = document.querySelector("#registerButton");
const loginButton = document.querySelector("#loginButton");
const profileButton = document.querySelector("#profileButton");
const logoutButton = document.querySelector("#logoutButton");
const authMessage = document.querySelector("#authMessage");
const registerNameInput = document.querySelector("#registerNameInput");
const usernameInput = document.querySelector("#usernameInput");
const registerEmailInput = document.querySelector("#registerEmailInput");
const registerPasswordInput = document.querySelector("#registerPasswordInput");
const loginEmailInput = document.querySelector("#loginEmailInput");
const loginPasswordInput = document.querySelector("#loginPasswordInput");
const profileNameInput = document.querySelector("#profileNameInput");
const profileUsernameInput = document.querySelector("#profileUsernameInput");
const appNav = document.querySelector(".app-nav");

const params = new URLSearchParams(window.location.search);
const debugEnabled = params.get("debug") === "true";
const highQualityEnabled = params.get("quality") === "high";
const STREAM_VIDEO_WIDTH = highQualityEnabled ? 2560 : 1920;
const STREAM_VIDEO_HEIGHT = highQualityEnabled ? 1440 : 1080;
const STREAM_FRAME_RATE = highQualityEnabled ? 60 : 30;
const STREAM_MAX_BITRATE = highQualityEnabled ? 16000000 : 8000000;
const translations = {
  pt: {
    pageDescription: "screen2.me cria uma sala rapida para compartilhar sua tela por link.",
    ready: "Pronto.",
    readyToShare: "Pronto para compartilhar.",
    openFromServer: "Abra pelo servidor local: http://127.0.0.1:3000",
    serverRequired: "Este app precisa rodar via servidor local para compartilhar tela.",
    connectingServer: "Conectando ao servidor local...",
    screenUnsupported: "Este navegador nao permite compartilhar tela aqui.",
    permissionDenied: "Permissao negada. No macOS, confira Screen Recording para o Chrome.",
    enteringRoom: "Entrando na sala...",
    chooseScreen: "Escolha Tela inteira ou uma janela. Evite compartilhar esta aba, porque o navegador pode pausar a captura ao trocar de aba.",
    sharing: "Transmitindo tela.",
    sharingPaused: "A captura parece pausada. Volte para a tela/janela compartilhada ou escolha Tela inteira para evitar pausas do navegador.",
    shareCancelled: "Compartilhamento cancelado.",
    cannotStart: "Nao foi possivel iniciar.",
    connectingHost: "Conectando ao apresentador...",
    waitingHost: "Aguardando apresentador.",
    viewerConnected: "Alguem entrou na sala.",
    hostSharedBy: "{name} compartilhou a tela.",
    watchingUserScreen: "Voce esta assistindo a tela de {name}.",
    hostLeft: "O apresentador saiu.",
    trialEnded: "Seu tempo anonimo acabou. Crie uma conta para continuar.",
    connectionLost: "Conexao caiu. Recarregue a pagina.",
    watching: "Assistindo transmissao.",
    copied: "Link copiado. Pode mandar para a galera.",
    ended: "Transmissao encerrada.",
    standby: "Standby",
    watchingMode: "Assistindo",
    live: "Ao vivo",
    waiting: "Aguardando",
    remote: "remoto",
    local: "local",
    share: "Compartilhar",
    sharingButton: "Compartilhando",
    stop: "Parar",
    link: "Link",
    copyLink: "Copiar link",
    room: "Sala",
    noRoom: "nenhuma",
    audience: "Publico",
    session: "Sessao",
    guest: "Visitante",
    signIn: "Criar conta",
    manage: "Editar",
    accountCtaEyebrow: "Conta gratuita",
    accountCtaTitle: "Compartilhe sem perder contexto",
    accountCtaText: "Guarde historico, reserve um @username e use seu link fixo /@username. O app continua gratuito.",
    trialLabel: "Acesso anonimo",
    trialText: "Sem conta, transmissao e visualizacao duram ate 15 minutos. Crie uma conta gratuita para continuar.",
    trialCreateAccount: "Criar conta",
    watchingNow: "Assistindo agora",
    noSignedViewers: "Nenhum viewer logado ainda.",
    madeBy: "Feito com ♥️ por",
    stageIdle: "Sua tela aparece aqui",
    stageShared: "Tela compartilhada",
    stageReceived: "Transmissao recebida",
    stagePaused: "Transmissao pausada",
    emptyTitle: "Um clique e o link esta pronto",
    emptyIdle: "Escolha uma tela, janela ou aba para comecar.",
    emptyHostLive: "Sua tela esta sendo enviada. O preview local fica oculto para evitar o efeito infinito. Para mais estabilidade, compartilhe Tela inteira ou uma janela, nao esta aba.",
    emptyViewerTitle: "Aguardando",
    emptyWaiting: "Aguardando o apresentador iniciar.",
    emptyNoHost: "Nao tem ninguem transmitindo nessa sala agora. A aba do apresentador precisa continuar aberta.",
    emptyConnectingVideo: "Conectando video ponto a ponto...",
    emptyNetworkBlocked: "Nao foi possivel criar a rota de video. Sua rede pode estar bloqueando WebRTC/UDP. Tente hotspot do celular, outra rede, desativar VPN/proxy/antivirus de rede, ou liberar trafego UDP no roteador/operadora.",
    emptyNoFrames: "Conectou, mas nenhum frame chegou ainda. Tente recarregar ou peca para o apresentador trocar a janela compartilhada.",
    emptyReturn: "Aguardando o apresentador voltar.",
    fullscreen: "Tela cheia",
    exitFullscreen: "Sair da tela cheia",
    controlLabel: "Controle de transmissao",
    linkRoomLabel: "Link da sala",
    statsLabel: "Status da sala",
    stageLabel: "Visualizacao da transmissao",
    howToEyebrow: "Comeco rapido",
    howToTitle: "Compartilhe sua tela em segundos",
    howToIntro: "screen2.me foi feito para salas rapidas: comece a transmitir, envie o link e mantenha a aba do apresentador aberta. Sem conta, o acesso anonimo dura 15 minutos.",
    stepOneTitle: "Inicie uma sala",
    stepOneText: "Clique em Compartilhar e escolha uma tela, janela ou aba.",
    stepTwoTitle: "Envie o link",
    stepTwoText: "Copie o link da sala ou seu /@username e mande para o grupo.",
    stepThreeTitle: "Fique ao vivo",
    stepThreeText: "Mantenha esta aba aberta enquanto as pessoas assistem.",
    benefitHistoryTitle: "Historico de salas",
    benefitHistoryText: "Encontre salas e sessoes anteriores sem procurar em conversas.",
    benefitUsernameTitle: "Link fixo",
    benefitUsernameText: "Reserve um username para um link pessoal como screen2.me/@leonardo.",
    name: "Nome",
    email: "Email",
    username: "Username",
    usernameHint: "Use letras, numeros ou underscore. Ex: @fulano",
    password: "Senha",
    register: "Criar conta",
    login: "Entrar",
    account: "Conta",
    authTitle: "Reserve seu link fixo de compartilhamento",
    authIntro: "Crie uma conta para guardar historico de salas e reservar um link como screen2.me/@leonardo.",
    authSuccess: "Conta pronta. Voltando para o app...",
    authLoginSuccess: "Login feito. Voltando para o app...",
    profileTitle: "Edite seu perfil",
    profileIntro: "Atualize o nome exibido e o @username do seu link fixo.",
    profileSave: "Salvar perfil",
    profileSuccess: "Perfil atualizado.",
    logout: "Sair",
    logoutSuccess: "Voce saiu da conta.",
    authError: "Nao foi possivel concluir. Confira os dados e tente novamente.",
    skip: "Pular",
    continue: "Continuar"
  },
  en: {
    pageDescription: "screen2.me creates a fast room to share your screen by link.",
    ready: "Ready.",
    readyToShare: "Ready to share.",
    openFromServer: "Open from the local server: http://127.0.0.1:3000",
    serverRequired: "This app must run from the local server to share your screen.",
    connectingServer: "Connecting to the local server...",
    screenUnsupported: "This browser cannot share the screen from here.",
    permissionDenied: "Permission denied. On macOS, check Screen Recording for Chrome.",
    enteringRoom: "Joining room...",
    chooseScreen: "Choose Entire Screen or a window. Avoid sharing this tab, because the browser can pause capture when you switch tabs.",
    sharing: "Sharing screen.",
    sharingPaused: "Capture looks paused. Go back to the shared screen/window or choose Entire Screen to avoid browser pauses.",
    shareCancelled: "Screen sharing cancelled.",
    cannotStart: "Could not start sharing.",
    connectingHost: "Connecting to presenter...",
    waitingHost: "Waiting for presenter.",
    viewerConnected: "Someone joined the room.",
    hostSharedBy: "{name} shared the screen.",
    watchingUserScreen: "You are watching {name}'s screen.",
    hostLeft: "The presenter left.",
    trialEnded: "Your anonymous time is up. Create an account to continue.",
    connectionLost: "Connection dropped. Reload the page.",
    watching: "Watching stream.",
    copied: "Link copied. Send it to the group.",
    ended: "Stream ended.",
    standby: "Standby",
    watchingMode: "Watching",
    live: "Live",
    waiting: "Waiting",
    remote: "remote",
    local: "local",
    share: "Share",
    sharingButton: "Sharing",
    stop: "Stop",
    link: "Link",
    copyLink: "Copy link",
    room: "Room",
    noRoom: "none",
    audience: "Audience",
    session: "Session",
    guest: "Guest",
    signIn: "Create account",
    manage: "Edit",
    accountCtaEyebrow: "Free account",
    accountCtaTitle: "Share without losing context",
    accountCtaText: "Save room history, reserve an @username, and use your fixed /@username link. The app stays free.",
    trialLabel: "Anonymous access",
    trialText: "Without an account, streaming and watching are limited to 15 minutes. Create a free account to continue.",
    trialCreateAccount: "Create account",
    watchingNow: "Watching now",
    noSignedViewers: "No signed-in viewers yet.",
    madeBy: "Made with ♥️ by",
    stageIdle: "Your screen appears here",
    stageShared: "Shared screen",
    stageReceived: "Incoming stream",
    stagePaused: "Stream paused",
    emptyTitle: "One click and the link is ready",
    emptyIdle: "Choose a screen, window, or tab to start.",
    emptyHostLive: "Your screen is being sent. Local preview stays hidden to avoid the infinite mirror. For better stability, share Entire Screen or a window, not this tab.",
    emptyViewerTitle: "Waiting",
    emptyWaiting: "Waiting for the presenter to start.",
    emptyNoHost: "Nobody is presenting in this room right now. The presenter tab must stay open.",
    emptyConnectingVideo: "Connecting peer-to-peer video...",
    emptyNetworkBlocked: "Could not create the video route. Your network may be blocking WebRTC/UDP. Try a mobile hotspot, another network, disabling VPN/proxy/network antivirus, or allowing UDP traffic on the router/ISP.",
    emptyNoFrames: "Connected, but no frames arrived yet. Try reloading or ask the presenter to switch the shared window.",
    emptyReturn: "Waiting for the presenter to come back.",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    controlLabel: "Broadcast controls",
    linkRoomLabel: "Room link",
    statsLabel: "Room status",
    stageLabel: "Stream preview",
    howToEyebrow: "Quick start",
    howToTitle: "Share your screen in seconds",
    howToIntro: "screen2.me is built for quick rooms: start sharing, send the link, and keep the presenter tab open. Without an account, anonymous access lasts 15 minutes.",
    stepOneTitle: "Start a room",
    stepOneText: "Click Share and choose a screen, window, or tab.",
    stepTwoTitle: "Send the link",
    stepTwoText: "Copy the room link or your /@username and send it to your group.",
    stepThreeTitle: "Stay live",
    stepThreeText: "Keep this tab open while people are watching.",
    benefitHistoryTitle: "Room history",
    benefitHistoryText: "Find past rooms and sessions without digging through chats.",
    benefitUsernameTitle: "Fixed share link",
    benefitUsernameText: "Reserve a username for a personal link like screen2.me/@leonardo.",
    name: "Name",
    email: "Email",
    username: "Username",
    usernameHint: "Use letters, numbers, or underscores. Ex: @alex",
    password: "Password",
    register: "Register",
    login: "Login",
    account: "Account",
    authTitle: "Reserve your fixed sharing link",
    authIntro: "Create an account to keep room history and claim a link like screen2.me/@leonardo.",
    authSuccess: "Account ready. Taking you back to the app...",
    authLoginSuccess: "Logged in. Taking you back to the app...",
    profileTitle: "Edit your profile",
    profileIntro: "Update your display name and fixed-link @username.",
    profileSave: "Save profile",
    profileSuccess: "Profile updated.",
    logout: "Logout",
    logoutSuccess: "You are logged out.",
    authError: "Could not complete. Check your details and try again.",
    skip: "Skip",
    continue: "Continue"
  }
};

let language = getInitialLanguage();
let roomId = params.get("roomId") || params.get("room") || getUserRoomFromPath();
let role = roomId || location.pathname === "/watch" ? "viewer" : "idle";
let socket;
let localStream;
let hostId;
let currentUser = null;
let statusKey = "ready";
let modeKey = "standby";
let stageKey = "stageIdle";
let badgeKey = "local";
let emptyTitleKey = "emptyTitle";
let emptyHintKey = "emptyIdle";
let hostDisplayName = null;
let trialEndsAt = null;
let trialInterval = null;
let audience = [];
let authMode = "register";
let authReturnPath = "/";
let iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
let frameWatchInterval = null;
let debugStatsInterval = null;
let networkBlockedShown = false;
const peers = new Map();
const pendingCandidates = new Map();

applyLanguage(language);
applyRouteState();
registerServiceWorker();
setupCurrentRoute();
Promise.all([loadSession(), loadRuntimeConfig()]).then(() => {
  debugLog("boot", {
    href: location.href,
    role,
    roomId,
    userAgent: navigator.userAgent,
    secureContext: window.isSecureContext,
    iceServers
  });
  trackEvent("page_view", { role, legacyRoomParam: Boolean(params.get("room")) });
  connect();
});

shareButton.addEventListener("click", startSharing);
stopButton.addEventListener("click", stopSharing);
copyButton.addEventListener("click", copyRoomLink);
fullscreenButton.addEventListener("click", toggleFullscreen);
languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
accountButton?.addEventListener("click", () => {
  openAuthModal(currentUser ? "profile" : "register", true);
});
closeHowToButton?.addEventListener("click", closeHowToModal);
skipHowToButton?.addEventListener("click", closeHowToModal);
createAccountLink?.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.setItem("screen2me:howToSeen", "true");
  closeHowToModal();
  openAuthModal("register", true);
  trackEvent("create_account_clicked", { source: "how_to" });
});
closeAuthButton?.addEventListener("click", closeAuthModal);
registerTab?.addEventListener("click", () => setAuthMode("register"));
loginTab?.addEventListener("click", () => setAuthMode("login"));
registerForm?.addEventListener("submit", registerAccount);
loginForm?.addEventListener("submit", loginAccount);
profileForm?.addEventListener("submit", updateProfile);
logoutButton?.addEventListener("click", logoutAccount);
document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
document.addEventListener("visibilitychange", handleVisibilityChange);
video.addEventListener("webkitbeginfullscreen", updateFullscreenButton);
video.addEventListener("webkitendfullscreen", updateFullscreenButton);
for (const eventName of ["loadstart", "loadedmetadata", "canplay", "playing", "waiting", "stalled", "suspend", "pause", "error", "emptied"]) {
  video.addEventListener(eventName, () => {
    debugLog(`video:event:${eventName}`, {
      ...videoSnapshot(),
      error: video.error ? { code: video.error.code, message: video.error.message } : null
    });
  });
}
window.addEventListener("beforeunload", () => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "leave-room" }));
  }
});
window.addEventListener("popstate", setupCurrentRoute);
window.addEventListener("orientationchange", () => window.setTimeout(updateFullscreenButton, 250));

async function connect() {
  if (!location.host || location.protocol === "file:") {
    setStatusKey("openFromServer");
    setEmptyHint("serverRequired");
    shareButton.disabled = true;
    return;
  }

  if (socket && [WebSocket.CONNECTING, WebSocket.OPEN].includes(socket.readyState)) return;

  setStatusKey("connectingServer");
  debugLog("socket:connecting", { url: `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}` });
  socket = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}`);

  socket.addEventListener("open", () => {
    debugLog("socket:open", { role, roomId });
    setStatusKey(role === "viewer" ? "enteringRoom" : "readyToShare");
    if (role === "viewer") {
      if (!roomId) {
        setStatusKey("waitingHost");
        setMode("waiting");
        setStage("stagePaused");
        setBadge("remote");
        setEmptyTitle("emptyViewerTitle");
        setEmptyHint("emptyNoHost");
        return;
      }
      socket.send(JSON.stringify({ type: "join-room", roomId, profile: socketProfile() }));
      shareButton.classList.add("hidden");
      setMode("watchingMode");
      roomLabel.textContent = roomId;
      setStage("stageReceived");
      setBadge("remote");
      setEmptyTitle("emptyViewerTitle");
      setEmptyHint("emptyWaiting");
    }
  });

  socket.addEventListener("message", async (event) => {
    const message = JSON.parse(event.data);
    debugLog("socket:message", summarizeSignalMessage(message));

    if (message.type === "profile") {
      if (message.user) {
        currentUser = message.user;
        updateAccountUi();
      }
    }

    if (message.type === "room-hosted") {
      roomId = message.roomId;
      role = "host";
      hostDisplayName = message.host?.displayName || displayCurrentUser();
      showRoomLink();
      setStatusKey("sharing");
      setMode("live");
      liveDot.classList.add("on");
      roomLabel.textContent = roomId;
      setStage("stageShared");
      setBadge("live");
      updateViewerCount(message.viewers.length);
      updateAudience(message.audience || []);
      setTrial(message.trial);
      setStageSubtitle(currentUser ? "" : t("trialText"));
      trackEvent("room_hosted", { viewerCount: message.viewers.length });
      for (const viewerId of message.viewers) {
        await callViewer(viewerId);
      }
    }

    if (message.type === "viewer-joined") {
      networkBlockedShown = false;
      hostDisplayName = message.host?.displayName || null;
      if (message.hostOnline && hostDisplayName) {
        setViewerWatchingCopy(hostDisplayName);
      } else {
        setViewerWatchingCopy(roomId ? `@${roomId}` : null, message.hostOnline ? "connectingHost" : "waitingHost");
      }
      roomLabel.textContent = message.roomId;
      updateAudience(message.audience || []);
      setTrial(message.trial);
      trackEvent("room_joined", { hostOnline: message.hostOnline });
      if (!message.hostOnline) {
        setMode("waiting");
        setStage("stagePaused");
        setBadge("remote");
        setEmptyTitle("emptyViewerTitle");
        setEmptyHint("emptyNoHost");
      }
    }

    if (message.type === "viewer-ready" && localStream) {
      updateViewerCount(peers.size + 1);
      setStatusKey("viewerConnected");
      trackEvent("viewer_connected", { viewerCount: peers.size + 1 });
      await callViewer(message.viewerId);
    }

    if (message.type === "host-ready") {
      networkBlockedShown = false;
      hostId = message.hostId;
      hostDisplayName = message.host?.displayName || null;
      setViewerWatchingCopy(hostDisplayName || (roomId ? `@${roomId}` : null), "connectingHost");
      setMode("watchingMode");
      setStage("stageReceived");
      setBadge("remote");
      setEmptyTitle("emptyViewerTitle");
      setEmptyHint("emptyConnectingVideo");
      setTrial(message.trial);
    }

    if (message.type === "host-left") {
      cleanupPeers();
      video.srcObject = null;
      video.removeAttribute("src");
      video.classList.remove("is-playing");
      resetScreenAspectRatio();
      emptyState.classList.remove("hidden");
      setMode("waiting");
      setStage("stagePaused");
      setBadge("remote");
      setEmptyTitle("emptyViewerTitle");
      setEmptyHint("emptyReturn");
      setStatusKey("hostLeft");
      clearTrial();
    }

    if (message.type === "viewer-left") {
      closePeer(message.viewerId);
      updateViewerCount(peers.size);
    }

    if (message.type === "audience-updated") {
      updateViewerCount(message.viewerCount || 0);
      updateAudience(message.audience || []);
    }

    if (message.type === "trial-ended") {
      handleTrialEnded();
    }

    if (message.type === "signal") {
      await handleSignal(message.from, message.signal);
    }

    if (message.type === "peer-missing") {
      closePeer(message.peerId);
    }

    if (message.type === "room-error") {
      setStatus(message.message);
    }
  });

  socket.addEventListener("close", () => {
    debugLog("socket:close", { role, roomId });
    setStatusKey("connectionLost");
  });
}

function applyRouteState() {
  const currentParams = new URLSearchParams(window.location.search);
  roomId = currentParams.get("roomId") || currentParams.get("room") || getUserRoomFromPath();
  role = roomId || location.pathname === "/watch" ? "viewer" : "idle";

  if (role === "viewer") {
    shareButton.classList.add("hidden");
    stopButton.classList.add("hidden");
    linkBox.classList.add("hidden");
    liveDot.classList.remove("on");
    clearTrial();
    setMode("watchingMode");
    setStage("stageReceived");
    setBadge("remote");
    setEmptyTitle("emptyViewerTitle");
    setEmptyHint(roomId ? "emptyWaiting" : "emptyNoHost");
    setViewerWatchingCopy(roomId ? `@${roomId}` : null, "enteringRoom");
    roomLabel.textContent = roomId || t("noRoom");
    updateViewerCount(0);
    return;
  }

  shareButton.classList.remove("hidden");
  stopButton.classList.add("hidden");
  setMode("standby");
  setStage("stageIdle");
  setBadge("local");
  setEmptyTitle("emptyTitle");
  setEmptyHint("emptyIdle");
  setStatusKey("ready");
}

function setViewerWatchingCopy(name, fallbackKey = "enteringRoom") {
  if (!name) {
    setStatusKey(fallbackKey);
    setStageSubtitle("");
    return;
  }
  const message = format("watchingUserScreen", { name });
  setStatus(message);
  setStageSubtitle(message);
}

async function startSharing() {
  trackEvent("share_clicked");

  if (!navigator.mediaDevices?.getDisplayMedia || !window.isSecureContext) {
    setStatusKey(location.protocol === "file:" ? "openFromServer" : "screenUnsupported");
    trackEvent("share_blocked", { reason: "unsupported_context" });
    return;
  }

  const connected = await ensureSocketReady();
  if (!connected) {
    setStatusKey(location.protocol === "file:" ? "openFromServer" : "connectionLost");
    trackEvent("share_blocked", { reason: "socket_unavailable" });
    return;
  }

  try {
    shareButton.disabled = true;
    setStatusKey("chooseScreen");
    if (currentUser?.username) {
      roomId = currentUser.username;
    }
    localStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: { ideal: STREAM_VIDEO_WIDTH, max: STREAM_VIDEO_WIDTH },
        height: { ideal: STREAM_VIDEO_HEIGHT, max: STREAM_VIDEO_HEIGHT },
        frameRate: { ideal: STREAM_FRAME_RATE, max: STREAM_FRAME_RATE },
        displaySurface: "monitor"
      },
      audio: false,
      selfBrowserSurface: "exclude",
      surfaceSwitching: "include",
      preferCurrentTab: false,
      monitorTypeSurfaces: "include"
    });
    for (const track of localStream.getVideoTracks()) {
      track.contentHint = "detail";
      await track.applyConstraints?.({
        width: { ideal: STREAM_VIDEO_WIDTH },
        height: { ideal: STREAM_VIDEO_HEIGHT },
        frameRate: { ideal: STREAM_FRAME_RATE }
      }).catch(() => {});
      attachCaptureTrackEvents(track);
      debugLog("share:track-settings", summarizeTrack(track));
    }
    trackEvent("share_permission_granted");

    video.srcObject = null;
    video.classList.remove("is-playing");
    resetScreenAspectRatio();
    emptyState.classList.remove("hidden");
    setEmptyTitle("live");
    setEmptyHint("emptyHostLive");
    stopButton.classList.remove("hidden");
    shareButton.querySelector("span").textContent = t("sharingButton");
    socket.send(JSON.stringify({ type: "host-room", roomId, profile: socketProfile() }));

    localStream.getVideoTracks()[0]?.addEventListener("ended", stopSharing);
  } catch (error) {
    shareButton.disabled = false;
    if (error.name === "NotAllowedError") {
      setStatusKey("permissionDenied");
    } else {
      setStatusKey("cannotStart");
    }
    console.error("Screen share failed", error);
    trackEvent("share_failed", { name: error.name, message: error.message });
  }
}

function attachCaptureTrackEvents(track) {
  track.addEventListener("mute", () => {
    debugLog("share:track-muted", summarizeTrack(track));
    if (!localStream) return;
    setStatusKey("sharingPaused");
    setStageSubtitle(t("sharingPaused"));
    trackEvent("share_track_muted");
  });

  track.addEventListener("unmute", () => {
    debugLog("share:track-unmuted", summarizeTrack(track));
    if (!localStream) return;
    setStatusKey("sharing");
    setStageSubtitle(currentUser ? "" : t("trialText"));
    trackEvent("share_track_unmuted");
  });

  track.addEventListener("ended", () => {
    debugLog("share:track-ended", summarizeTrack(track));
    trackEvent("share_track_ended");
  });
}

function handleVisibilityChange() {
  if (!localStream || role !== "host") return;
  debugLog("page:visibility", { state: document.visibilityState });
  if (document.visibilityState === "hidden") {
    setStageSubtitle(t("emptyHostLive"));
  }
}

function ensureSocketReady() {
  if (socket?.readyState === WebSocket.OPEN) return Promise.resolve(true);

  connect();

  if (!socket) return Promise.resolve(false);
  if (socket.readyState === WebSocket.OPEN) return Promise.resolve(true);

  setStatusKey("connectingServer");

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      resolve(false);
    }, 2500);

    function cleanup() {
      window.clearTimeout(timeout);
      socket?.removeEventListener("open", handleOpen);
      socket?.removeEventListener("error", handleError);
      socket?.removeEventListener("close", handleError);
    }

    function handleOpen() {
      cleanup();
      resolve(true);
    }

    function handleError() {
      cleanup();
      resolve(false);
    }

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("error", handleError);
    socket.addEventListener("close", handleError);
  });
}

function stopSharing() {
  if (role === "host" && socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "leave-room" }));
  }
  for (const track of localStream?.getTracks() || []) {
    track.stop();
  }
  localStream = null;
  cleanupPeers();
  stopFrameWatch();
  video.srcObject = null;
  video.classList.remove("is-playing");
  resetScreenAspectRatio();
  emptyState.classList.remove("hidden");
  shareButton.disabled = false;
  shareButton.querySelector("span").textContent = t("share");
  stopButton.classList.add("hidden");
  setMode("standby");
  liveDot.classList.remove("on");
  setStage("stageIdle");
  setBadge("local");
  setEmptyTitle("emptyTitle");
  setEmptyHint("emptyIdle");
  updateViewerCount(0);
  updateAudience([]);
  clearTrial();
  setStageSubtitle("");
  setStatusKey("ended");
  trackEvent("share_stopped");
}

async function callViewer(viewerId) {
  const peer = createPeer(viewerId);
  for (const track of localStream.getTracks()) {
    const sender = peer.addTrack(track, localStream);
    await tuneVideoSender(sender);
  }
  preferVp8(peer);
  const offer = await peer.createOffer();
  debugLog("webrtc:offer-created", { viewerId, sdp: summarizeSdp(offer.sdp) });
  await peer.setLocalDescription(offer);
  debugLog("webrtc:offer-local-description", { viewerId, sdp: summarizeSdp(peer.localDescription?.sdp) });
  sendSignal(viewerId, peer.localDescription);
}

async function handleSignal(from, signal) {
  const peer = peers.get(from) || createPeer(from);

  if (signal.type === "offer") {
    hostId = from;
    await peer.setRemoteDescription(signal);
    debugLog("webrtc:offer-remote-description", { from, sdp: summarizeSdp(signal.sdp) });
    await flushPendingCandidates(from, peer);
    preferVp8(peer);
    const answer = await peer.createAnswer();
    debugLog("webrtc:answer-created", { from, sdp: summarizeSdp(answer.sdp) });
    await peer.setLocalDescription(answer);
    debugLog("webrtc:answer-local-description", { from, sdp: summarizeSdp(peer.localDescription?.sdp) });
    sendSignal(from, peer.localDescription);
    return;
  }

  if (signal.type === "answer") {
    await peer.setRemoteDescription(signal);
    debugLog("webrtc:answer-remote-description", { from, sdp: summarizeSdp(signal.sdp) });
    await flushPendingCandidates(from, peer);
    return;
  }

  if (signal.candidate) {
    if (!peer.remoteDescription) {
      queueCandidate(from, signal);
      return;
    }
    debugLog("webrtc:candidate-add", { from, candidate: summarizeCandidate(signal.candidate) });
    await peer.addIceCandidate(signal);
  }
}

function createPeer(peerId) {
  const peer = new RTCPeerConnection({ iceServers });
  debugLog("peer:create", { peerId, iceServers });

  peers.set(peerId, peer);

  peer.addEventListener("icecandidate", (event) => {
    debugLog("peer:icecandidate", { peerId, candidate: summarizeCandidate(event.candidate) });
    if (event.candidate) sendSignal(peerId, event.candidate);
  });

  peer.addEventListener("track", (event) => {
    const stream = event.streams[0] || new MediaStream([event.track]);
    debugLog("peer:track", {
      peerId,
      track: summarizeTrack(event.track),
      streams: event.streams.length
    });
    showRemoteStream(stream, event.track, peer);
    setMode("live");
    liveDot.classList.add("on");
    setBadge("live");
    setStatusKey("connectingHost");
  });

  peer.addEventListener("connectionstatechange", () => {
    debugLog("peer:connectionstate", {
      peerId,
      connectionState: peer.connectionState,
      iceConnectionState: peer.iceConnectionState,
      signalingState: peer.signalingState
    });
    if (peer.connectionState === "connecting" && role === "viewer") {
      setEmptyHint("emptyConnectingVideo");
    }
    if (peer.connectionState === "connected" && role === "viewer") {
      playRemoteVideo();
      waitForVideoFrame(peer);
    }
    if (peer.connectionState === "failed" && role === "viewer") {
      showNetworkBlockedMessage("connection_failed");
    }
    if (["closed", "failed"].includes(peer.connectionState)) {
      closePeer(peerId);
    }
  });

  peer.addEventListener("iceconnectionstatechange", () => {
    debugLog("peer:icestate", { peerId, iceConnectionState: peer.iceConnectionState });
    trackEvent("ice_state", { state: peer.iceConnectionState });
    if (peer.iceConnectionState === "failed") {
      peer.restartIce?.();
      if (role === "viewer") showNetworkBlockedMessage("ice_failed");
    }
  });

  peer.addEventListener("icegatheringstatechange", () => {
    debugLog("peer:gatheringstate", { peerId, iceGatheringState: peer.iceGatheringState });
  });

  peer.addEventListener("signalingstatechange", () => {
    debugLog("peer:signalingstate", { peerId, signalingState: peer.signalingState });
  });

  return peer;
}

function preferVp8(peer) {
  if (!window.RTCRtpReceiver?.getCapabilities) return;
  const codecs = RTCRtpReceiver.getCapabilities("video")?.codecs || [];
  if (!codecs.some((codec) => codec.mimeType.toLowerCase() === "video/vp8")) return;
  const sortedCodecs = [...codecs].sort((a, b) => {
    const aIsVp8 = a.mimeType.toLowerCase() === "video/vp8";
    const bIsVp8 = b.mimeType.toLowerCase() === "video/vp8";
    return Number(bIsVp8) - Number(aIsVp8);
  });

  for (const transceiver of peer.getTransceivers()) {
    if (transceiver.sender?.track?.kind === "video" || transceiver.receiver?.track?.kind === "video") {
      try {
        transceiver.setCodecPreferences?.(sortedCodecs);
      } catch (error) {
        debugLog("webrtc:codec-preference-failed", { name: error.name, message: error.message });
      }
    }
  }
}

async function tuneVideoSender(sender) {
  if (sender.track?.kind !== "video" || !sender.getParameters || !sender.setParameters) return;
  const parameters = sender.getParameters();
  parameters.encodings = parameters.encodings?.length ? parameters.encodings : [{}];
  parameters.encodings[0] = {
    ...parameters.encodings[0],
    maxBitrate: STREAM_MAX_BITRATE,
    maxFramerate: STREAM_FRAME_RATE,
    scaleResolutionDownBy: 1
  };
  parameters.degradationPreference = "maintain-resolution";
  try {
    await sender.setParameters(parameters);
    debugLog("webrtc:sender-tuned", parameters.encodings[0]);
  } catch (error) {
    debugLog("webrtc:sender-tune-failed", { name: error.name, message: error.message });
  }
}

async function showRemoteStream(stream, track, peer) {
  debugLog("video:stream-attach", {
    streamTracks: stream.getTracks().map(summarizeTrack),
    track: summarizeTrack(track)
  });
  video.srcObject = stream;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.classList.remove("is-playing");
  emptyState.classList.remove("hidden");
  setEmptyTitle("emptyViewerTitle");
  setEmptyHint("emptyConnectingVideo");

  video.onloadedmetadata = () => {
    updateScreenAspectRatio();
    playRemoteVideo();
  };
  video.onresize = () => {
    updateScreenAspectRatio();
    waitForVideoFrame(peer);
  };
  track?.addEventListener("unmute", () => {
    playRemoteVideo();
    waitForVideoFrame(peer);
  });
  await playRemoteVideo();

  waitForVideoFrame(peer);
  startDebugStats(peer);
}

async function playRemoteVideo() {
  try {
    await video.play();
    debugLog("video:play-ok", videoSnapshot());
  } catch (error) {
    console.error("Remote video play failed", error);
    debugLog("video:play-failed", { name: error.name, message: error.message, ...videoSnapshot() });
    window.setTimeout(() => video.play().catch(() => {}), 350);
  }
}

function waitForVideoFrame(peer) {
  stopFrameWatch();
  const startedAt = Date.now();

  function markPlaying() {
    const quality = typeof video.getVideoPlaybackQuality === "function" ? video.getVideoPlaybackQuality() : null;
    const hasRealSize = video.videoWidth >= 16 && video.videoHeight >= 16;
    const hasDecodedFrames = (quality?.totalVideoFrames || 0) > 0;
    if (hasRealSize || hasDecodedFrames) {
      video.classList.add("is-playing");
      updateScreenAspectRatio();
      emptyState.classList.add("hidden");
      setStatusKey("watching");
      debugLog("video:playing-detected", videoSnapshot());
      trackEvent("video_playing", { width: video.videoWidth, height: video.videoHeight });
      return true;
    }
    return false;
  }

  if (markPlaying()) return;

  if ("requestVideoFrameCallback" in video) {
    video.requestVideoFrameCallback(() => markPlaying());
  }

  frameWatchInterval = window.setInterval(async () => {
    if (markPlaying()) {
      window.clearInterval(frameWatchInterval);
      frameWatchInterval = null;
      return;
    }

    if (Date.now() - startedAt > 7000) {
      window.clearInterval(frameWatchInterval);
      frameWatchInterval = null;
      setStatusKey("watching");
      setEmptyHint("emptyNoFrames");
      const stats = await remoteVideoStats(peer);
      debugLog("video:no-frames", { ...videoSnapshot(), stats });
      showNetworkBlockedMessage("no_frames");
      trackEvent("video_no_frames", {
        readyState: video.readyState,
        networkState: video.networkState,
        peerCount: peers.size,
        ...stats
      });
      playRemoteVideo();
    }
  }, 250);
}

function stopFrameWatch() {
  if (!frameWatchInterval) return;
  window.clearInterval(frameWatchInterval);
  frameWatchInterval = null;
}

function startDebugStats(peer) {
  if (!debugEnabled) return;
  if (debugStatsInterval) window.clearInterval(debugStatsInterval);
  debugStatsInterval = window.setInterval(async () => {
    debugLog("stats:remote-video", {
      video: videoSnapshot(),
      receivers: peer.getReceivers?.().map((receiver) => ({
        track: summarizeTrack(receiver.track),
        parameters: receiver.getParameters?.()
      })),
      stats: await remoteVideoStats(peer),
      candidates: await selectedCandidatePair(peer),
      report: await debugStatsSummary(peer)
    });
  }, 3000);
}

function stopDebugStats() {
  if (!debugStatsInterval) return;
  window.clearInterval(debugStatsInterval);
  debugStatsInterval = null;
}

function showNetworkBlockedMessage(reason) {
  if (role !== "viewer" || networkBlockedShown) return;
  networkBlockedShown = true;
  setStatusKey("connectionLost");
  setEmptyTitle("emptyViewerTitle");
  setEmptyHint("emptyNetworkBlocked");
  debugLog("network:blocked", { reason, roomId, hostId });
  trackEvent("network_blocked", { reason });
}

async function remoteVideoStats(peer) {
  if (!peer?.getStats) return {};
  try {
    const report = await peer.getStats();
    let codecById = {};
    for (const item of report.values()) {
      if (item.type === "codec") {
        codecById[item.id] = {
          mimeType: item.mimeType,
          clockRate: item.clockRate,
          sdpFmtpLine: item.sdpFmtpLine
        };
      }
    }
    for (const item of report.values()) {
      if (item.type === "inbound-rtp" && (item.kind === "video" || item.mediaType === "video")) {
        return {
          bytesReceived: item.bytesReceived || 0,
          packetsReceived: item.packetsReceived || 0,
          framesDecoded: item.framesDecoded || 0,
          framesReceived: item.framesReceived || 0,
          framesDropped: item.framesDropped || 0,
          keyFramesDecoded: item.keyFramesDecoded || 0,
          frameWidth: item.frameWidth || 0,
          frameHeight: item.frameHeight || 0,
          jitter: item.jitter || 0,
          packetsLost: item.packetsLost || 0,
          codec: codecById[item.codecId] || null
        };
      }
    }
  } catch {
    return {};
  }
  return {};
}

async function selectedCandidatePair(peer) {
  if (!peer?.getStats) return {};
  try {
    const report = await peer.getStats();
    let selectedPair = null;
    for (const item of report.values()) {
      if (item.type === "transport" && item.selectedCandidatePairId) {
        selectedPair = report.get(item.selectedCandidatePairId);
      }
      if (item.type === "candidate-pair" && item.selected) {
        selectedPair = item;
      }
      if (item.type === "candidate-pair" && item.nominated && item.state === "succeeded") {
        selectedPair = selectedPair || item;
      }
    }
    if (!selectedPair) return {};
    const local = report.get(selectedPair.localCandidateId);
    const remote = report.get(selectedPair.remoteCandidateId);
    return {
      state: selectedPair.state,
      nominated: selectedPair.nominated,
      currentRoundTripTime: selectedPair.currentRoundTripTime,
      availableOutgoingBitrate: selectedPair.availableOutgoingBitrate,
      local: summarizeStatsCandidate(local),
      remote: summarizeStatsCandidate(remote)
    };
  } catch {
    return {};
  }
}

async function debugStatsSummary(peer) {
  if (!debugEnabled || !peer?.getStats) return {};
  try {
    const report = await peer.getStats();
    const summary = {
      types: {},
      inboundVideo: [],
      candidatePairs: [],
      transports: []
    };
    for (const item of report.values()) {
      summary.types[item.type] = (summary.types[item.type] || 0) + 1;
      if (item.type === "inbound-rtp" && (item.kind === "video" || item.mediaType === "video")) {
        summary.inboundVideo.push({
          id: item.id,
          kind: item.kind,
          mediaType: item.mediaType,
          bytesReceived: item.bytesReceived,
          packetsReceived: item.packetsReceived,
          framesReceived: item.framesReceived,
          framesDecoded: item.framesDecoded,
          frameWidth: item.frameWidth,
          frameHeight: item.frameHeight,
          codecId: item.codecId
        });
      }
      if (item.type === "candidate-pair") {
        summary.candidatePairs.push({
          id: item.id,
          state: item.state,
          selected: item.selected,
          nominated: item.nominated,
          bytesReceived: item.bytesReceived,
          bytesSent: item.bytesSent,
          localCandidateId: item.localCandidateId,
          remoteCandidateId: item.remoteCandidateId
        });
      }
      if (item.type === "transport") {
        summary.transports.push({
          id: item.id,
          selectedCandidatePairId: item.selectedCandidatePairId,
          dtlsState: item.dtlsState,
          iceRole: item.iceRole,
          iceLocalUsernameFragment: item.iceLocalUsernameFragment
        });
      }
    }
    return summary;
  } catch (error) {
    return { error: error.message };
  }
}

function summarizeStatsCandidate(candidate) {
  if (!candidate) return null;
  return {
    type: candidate.candidateType,
    protocol: candidate.protocol,
    address: candidate.address || candidate.ip,
    port: candidate.port,
    networkType: candidate.networkType,
    relayProtocol: candidate.relayProtocol
  };
}

function videoSnapshot() {
  const quality = typeof video.getVideoPlaybackQuality === "function" ? video.getVideoPlaybackQuality() : null;
  return {
    readyState: video.readyState,
    networkState: video.networkState,
    paused: video.paused,
    muted: video.muted,
    currentTime: Number(video.currentTime.toFixed(2)),
    width: video.videoWidth,
    height: video.videoHeight,
    totalVideoFrames: quality?.totalVideoFrames || 0,
    droppedVideoFrames: quality?.droppedVideoFrames || 0,
    corruptedVideoFrames: quality?.corruptedVideoFrames || 0
  };
}

function updateScreenAspectRatio() {
  if (!video.videoWidth || !video.videoHeight) return;
  screenFrame.style.setProperty("--screen-aspect-ratio", `${video.videoWidth} / ${video.videoHeight}`);
}

function resetScreenAspectRatio() {
  screenFrame.style.removeProperty("--screen-aspect-ratio");
}

function summarizeTrack(track) {
  if (!track) return null;
  return {
    id: track.id,
    kind: track.kind,
    label: track.label,
    enabled: track.enabled,
    muted: track.muted,
    readyState: track.readyState,
    settings: track.getSettings?.()
  };
}

function summarizeCandidate(candidate) {
  if (!candidate) return null;
  const raw = typeof candidate === "string" ? candidate : candidate.candidate;
  if (!raw) return null;
  const type = raw.match(/ typ ([a-z]+)/)?.[1] || null;
  const protocol = raw.match(/ udp | tcp /i)?.[0]?.trim().toLowerCase() || null;
  const address = raw.match(/candidate:\S+ \d+ \S+ \d+ ([^\s]+) (\d+)/);
  return {
    type,
    protocol,
    address: address?.[1] || null,
    port: address?.[2] || null
  };
}

function summarizeSdp(sdp = "") {
  return {
    codecs: [...sdp.matchAll(/^a=rtpmap:\d+ ([^/\r\n]+)/gim)].map((match) => match[1]),
    iceUfrag: sdp.match(/^a=ice-ufrag:(.+)$/im)?.[1] || null,
    fingerprint: Boolean(sdp.match(/^a=fingerprint:/im)),
    hasVideo: /^m=video /im.test(sdp)
  };
}

function summarizeSignalMessage(message) {
  if (message.type !== "signal") return message;
  return {
    type: message.type,
    from: message.from,
    to: message.to,
    signalType: message.signal?.type || (message.signal?.candidate ? "candidate" : "unknown"),
    candidate: summarizeCandidate(message.signal?.candidate),
    sdp: summarizeSdp(message.signal?.sdp)
  };
}

function debugLog(label, data = {}) {
  if (!debugEnabled) return;
  console.log(`[screen2.me debug] ${label}`, data);
}

function sendSignal(to, signal) {
  debugLog("signal:send", summarizeSignalMessage({ type: "signal", to, signal }));
  socket.send(JSON.stringify({ type: "signal", to, signal }));
}

function closePeer(peerId) {
  peers.get(peerId)?.close();
  peers.delete(peerId);
  pendingCandidates.delete(peerId);
}

function cleanupPeers() {
  stopFrameWatch();
  stopDebugStats();
  for (const peerId of peers.keys()) {
    closePeer(peerId);
  }
}

function queueCandidate(peerId, candidate) {
  const queue = pendingCandidates.get(peerId) || [];
  queue.push(candidate);
  pendingCandidates.set(peerId, queue);
}

async function flushPendingCandidates(peerId, peer) {
  const queue = pendingCandidates.get(peerId) || [];
  pendingCandidates.delete(peerId);
  for (const candidate of queue) {
    await peer.addIceCandidate(candidate);
  }
}

function showRoomLink() {
  shareLink.value = currentUser?.username
    ? new URL(`/@${currentUser.username}`, window.location.origin).toString()
    : legacyWatchUrl(roomId).toString();
  linkBox.classList.remove("hidden");
  copyRoomLink();
}

function legacyWatchUrl(id) {
  const url = new URL("/watch", window.location.origin);
  url.searchParams.set("roomId", id);
  return url;
}

async function copyRoomLink() {
  shareLink.select();
  try {
    await navigator.clipboard.writeText(shareLink.value);
    if (role === "host") setStatusKey("copied");
    trackEvent("link_copied");
  } catch {
    document.execCommand("copy");
  }
}

function updateViewerCount(count) {
  viewerCount.textContent = String(count);
}

function updateAudience(nextAudience) {
  audience = nextAudience;
  if (!audiencePanel || !audienceList) return;
  audiencePanel.classList.toggle("hidden", role !== "host" && audience.length === 0);
  const names = audience.map((user) => user.displayName || user.name || `@${user.username}`).filter(Boolean);
  audienceList.textContent = names.length ? names.join(", ") : t("noSignedViewers");
}

function setTrial(trial) {
  clearTrial();
  if (!trial || currentUser) {
    trialPanel?.classList.add("hidden");
    return;
  }

  trialEndsAt = trial.endsAt;
  trialPanel?.classList.remove("hidden");
  tickTrial();
  trialInterval = window.setInterval(tickTrial, 1000);
}

function clearTrial() {
  if (trialInterval) {
    window.clearInterval(trialInterval);
    trialInterval = null;
  }
  trialEndsAt = null;
  trialPanel?.classList.add("hidden");
}

function tickTrial() {
  if (!trialEndsAt || !trialCountdown) return;
  const remaining = Math.max(0, Math.ceil((trialEndsAt - Date.now()) / 1000));
  const minutes = Math.floor(remaining / 60);
  const seconds = String(remaining % 60).padStart(2, "0");
  trialCountdown.textContent = `${minutes}:${seconds}`;
  if (remaining <= 0) handleTrialEnded();
}

function handleTrialEnded() {
  clearTrial();
  if (role === "host") {
    stopSharing();
  } else {
    cleanupPeers();
    video.srcObject = null;
    video.classList.remove("is-playing");
    resetScreenAspectRatio();
    emptyState.classList.remove("hidden");
  }
  setStatusKey("trialEnded");
  setEmptyTitle("trialEnded");
  setEmptyHint("trialText");
  window.setTimeout(() => {
    window.location.href = "/account";
  }, 650);
}

function setStatus(message) {
  statusText.textContent = message;
}

function setStatusKey(key) {
  statusKey = key;
  setStatus(t(key));
}

function setMode(key) {
  modeKey = key;
  modeLabel.textContent = t(key);
}

function setStage(key) {
  stageKey = key;
  stageTitle.textContent = t(key);
}

function setStageSubtitle(message) {
  if (stageSubtitle) stageSubtitle.textContent = message;
}

function setBadge(key) {
  badgeKey = key;
  connectionBadge.textContent = t(key);
}

function setEmptyHint(key) {
  emptyHintKey = key;
  emptyHint.textContent = t(key);
}

function setEmptyTitle(key) {
  emptyTitleKey = key;
  emptyTitle.textContent = t(key);
}

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  localStorage.setItem("screen2me:language", language);
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.querySelector('meta[name="description"]').content = t("pageDescription");

  languageSelect.value = language;
  languageFlag.textContent = language === "pt" ? "🇧🇷" : "🇺🇸";

  shareButton.querySelector("span").textContent = shareButton.disabled ? t("sharingButton") : t("share");
  stopButton.querySelector("span").textContent = t("stop");
  linkLabel.textContent = t("link");
  roomStatLabel.textContent = t("room");
  viewerStatLabel.textContent = t("audience");
  if (madeByNote) {
    madeByNote.innerHTML = `${t("madeBy")} <a href="https://leonardosalles.com" target="_blank" rel="noreferrer">Leonardo Salles</a>`;
  }
  if (accountLabel) accountLabel.textContent = t("session");
  if (accountCtaEyebrow) accountCtaEyebrow.textContent = t("accountCtaEyebrow");
  if (accountCtaTitle) accountCtaTitle.textContent = t("accountCtaTitle");
  if (accountCtaText) accountCtaText.textContent = t("accountCtaText");
  if (trialLabel) trialLabel.textContent = t("trialLabel");
  if (trialText) trialText.textContent = t("trialText");
  if (trialAccountLink) trialAccountLink.textContent = t("trialCreateAccount");
  if (watchingNowLabel) watchingNowLabel.textContent = t("watchingNow");
  updateAudience(audience);
  updateAccountUi();
  if (howToEyebrow) howToEyebrow.textContent = t("howToEyebrow");
  if (howToTitle) howToTitle.textContent = t("howToTitle");
  if (howToIntro) howToIntro.textContent = t("howToIntro");
  if (stepOneTitle) stepOneTitle.textContent = t("stepOneTitle");
  if (stepOneText) stepOneText.textContent = t("stepOneText");
  if (stepTwoTitle) stepTwoTitle.textContent = t("stepTwoTitle");
  if (stepTwoText) stepTwoText.textContent = t("stepTwoText");
  if (stepThreeTitle) stepThreeTitle.textContent = t("stepThreeTitle");
  if (stepThreeText) stepThreeText.textContent = t("stepThreeText");
  if (benefitHistoryTitle) benefitHistoryTitle.textContent = t("benefitHistoryTitle");
  if (benefitHistoryText) benefitHistoryText.textContent = t("benefitHistoryText");
  if (benefitUsernameTitle) benefitUsernameTitle.textContent = t("benefitUsernameTitle");
  if (benefitUsernameText) benefitUsernameText.textContent = t("benefitUsernameText");
  if (skipHowToButton) skipHowToButton.textContent = t("skip");
  if (createAccountLink) createAccountLink.textContent = t("signIn");
  if (authEyebrow) authEyebrow.textContent = t("account");
  if (authTitle) authTitle.textContent = t(authMode === "profile" ? "profileTitle" : "authTitle");
  if (authIntro) authIntro.textContent = t(authMode === "profile" ? "profileIntro" : "authIntro");
  if (registerTab) registerTab.textContent = t("register");
  if (loginTab) loginTab.textContent = t("login");
  if (registerNameLabel) registerNameLabel.textContent = t("name");
  if (usernameLabel) usernameLabel.textContent = t("username");
  if (usernameHint) usernameHint.textContent = t("usernameHint");
  if (registerEmailLabel) registerEmailLabel.textContent = t("email");
  if (registerPasswordLabel) registerPasswordLabel.textContent = t("password");
  if (loginEmailLabel) loginEmailLabel.textContent = t("email");
  if (loginPasswordLabel) loginPasswordLabel.textContent = t("password");
  if (profileNameLabel) profileNameLabel.textContent = t("name");
  if (profileUsernameLabel) profileUsernameLabel.textContent = t("username");
  if (profileUsernameHint) profileUsernameHint.textContent = t("usernameHint");
  if (registerButton) registerButton.textContent = t("signIn");
  if (loginButton) loginButton.textContent = t("login");
  if (profileButton) profileButton.textContent = t("profileSave");
  if (logoutButton) logoutButton.textContent = t("logout");
  setEmptyTitle(emptyTitleKey);

  quickCard.setAttribute("aria-label", t("controlLabel"));
  linkBox.setAttribute("aria-label", t("linkRoomLabel"));
  statsBox.setAttribute("aria-label", t("statsLabel"));
  document.querySelector(".stage").setAttribute("aria-label", t("stageLabel"));
  copyButton.setAttribute("aria-label", t("copyLink"));
  copyButton.title = t("copyLink");

  if (!roomId) roomLabel.textContent = t("noRoom");
  if (role === "viewer" && roomId) {
    setViewerWatchingCopy(hostDisplayName || `@${roomId}`, statusKey);
  } else {
    setStatus(t(statusKey));
  }
  setMode(modeKey);
  setStage(stageKey);
  setBadge(badgeKey);
  setEmptyHint(emptyHintKey);
  updateFullscreenButton();
}

function getInitialLanguage() {
  const saved = localStorage.getItem("screen2me:language");
  if (saved === "pt" || saved === "en") return saved;
  return "en";
}

function t(key) {
  return translations[language][key];
}

function format(key, values) {
  return Object.entries(values).reduce((text, [name, value]) => text.replace(`{${name}}`, value), t(key));
}

async function toggleFullscreen() {
  try {
    if (isFullscreen()) {
      await exitFullscreenMode();
      return;
    }

    await enterFullscreenMode();
  } catch (error) {
    console.warn("Fullscreen failed", error);
  }
}

function updateFullscreenButton() {
  const fullscreenActive = isFullscreen();
  fullscreenButton.setAttribute("aria-label", t(fullscreenActive ? "exitFullscreen" : "fullscreen"));
  fullscreenButton.title = t(fullscreenActive ? "exitFullscreen" : "fullscreen");
  fullscreenButton.querySelector(".enter-fullscreen").classList.toggle("hidden", fullscreenActive);
  fullscreenButton.querySelector(".exit-fullscreen").classList.toggle("hidden", !fullscreenActive);
}

async function enterFullscreenMode() {
  const request =
    screenFrame.requestFullscreen ||
    screenFrame.webkitRequestFullscreen ||
    screenFrame.webkitRequestFullScreen ||
    screenFrame.msRequestFullscreen;

  if (request) {
    await request.call(screenFrame);
    updateFullscreenButton();
    return;
  }

  const videoFullscreen = video.webkitEnterFullscreen || video.webkitEnterFullScreen;
  if (videoFullscreen && video.srcObject && video.classList.contains("is-playing")) {
    videoFullscreen.call(video);
    updateFullscreenButton();
  }
}

async function exitFullscreenMode() {
  const exit =
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.webkitCancelFullScreen ||
    document.msExitFullscreen;

  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    await exit?.call(document);
  }

  if (video.webkitDisplayingFullscreen) {
    const exitVideoFullscreen = video.webkitExitFullscreen || video.webkitExitFullScreen;
    exitVideoFullscreen?.call(video);
  }

  updateFullscreenButton();
}

function isFullscreen() {
  return Boolean(
    document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      video.webkitDisplayingFullscreen
  );
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
}

async function loadRuntimeConfig() {
  try {
    const response = await fetch("/api/config", { credentials: "same-origin" });
    if (!response.ok) return;
    const data = await response.json();
    if (Array.isArray(data.iceServers) && data.iceServers.length > 0) {
      iceServers = data.iceServers;
    }
  } catch {
    // Keep the default STUN-only config when runtime config is unavailable.
  }
}

async function loadSession() {
  try {
    localStorage.removeItem("screen2me:user");
    localStorage.removeItem("screen2me:deviceId");
    const response = await fetch("/api/auth/me", { credentials: "same-origin" });
    if (!response.ok) return;
    const data = await response.json();
    if (data.user) {
      currentUser = data.user;
      updateAccountUi();
      if (!authView?.classList.contains("hidden")) {
        setAuthMode("profile");
      }
    }
  } catch {
    // Tracking is best-effort; the sharing flow should never depend on it.
  }
}

async function registerAccount(event) {
  event.preventDefault();
  const payload = {
    name: registerNameInput?.value || "",
    username: usernameInput?.value || "",
    email: registerEmailInput?.value || "",
    password: registerPasswordInput?.value || "",
    language
  };

  await submitAuth("/api/auth/register", payload, "authSuccess");
}

async function loginAccount(event) {
  event.preventDefault();
  const payload = {
    email: loginEmailInput?.value || "",
    password: loginPasswordInput?.value || ""
  };

  await submitAuth("/api/auth/login", payload, "authLoginSuccess");
}

async function updateProfile(event) {
  event.preventDefault();
  await submitAuth(
    "/api/auth/profile",
    {
      name: profileNameInput?.value || "",
      username: profileUsernameInput?.value || ""
    },
    "profileSuccess",
    false
  );
}

async function logoutAccount() {
  setAuthMessage("");
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin"
    });
    if (!response.ok) {
      setAuthMessage(t("authError"));
      return;
    }
    currentUser = null;
    updateAccountUi();
    setAuthMessage(t("logoutSuccess"));
    trackEvent("user_logged_out");
    window.setTimeout(closeAuthModal, 450);
  } catch {
    setAuthMessage(t("authError"));
  }
}

async function submitAuth(url, payload, successKey, closeOnSuccess = true) {
  setAuthMessage("");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setAuthMessage(data.message || t("authError"));
      return;
    }
    currentUser = data.user;
    updateAccountUi();
    setAuthMessage(t(successKey));
    trackEvent(authEventName(url));
    if (closeOnSuccess) {
      window.setTimeout(() => {
        closeAuthModal();
      }, 650);
    }
  } catch {
    setAuthMessage(t("authError"));
  }
}

function authEventName(url) {
  if (url.endsWith("/register")) return "user_registered";
  if (url.endsWith("/login")) return "user_logged_in";
  if (url.endsWith("/profile")) return "profile_updated";
  return "auth_updated";
}

function updateAccountUi() {
  const displayName = displayCurrentUser();
  if (!accountName || !accountButton) return;
  accountName.textContent = displayName;
  accountButton.title = currentUser ? t("manage") : t("signIn");
  if (accountLabel) accountLabel.textContent = currentUser ? t("account") : t("session");
}

function displayCurrentUser() {
  return currentUser?.username ? `@${currentUser.username}` : currentUser?.name || currentUser?.email || t("guest");
}

function socketProfile() {
  if (!currentUser) return null;
  return {
    username: currentUser.username || null,
    name: currentUser.name || null
  };
}

function getUserRoomFromPath() {
  const match = location.pathname.match(/^\/@([a-z0-9_]{3,40})(?:\/live)?\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

function setupCurrentRoute() {
  applyRouteState();
  if (location.pathname === "/account") {
    openAuthModal(params.get("mode") === "login" ? "login" : "register", false);
    return;
  }
  appNav?.classList.remove("hidden");
  authView?.classList.add("hidden");
  showFirstRunModal();
}

function openAuthModal(mode = "register", pushRoute = false) {
  authView?.classList.remove("hidden");
  document.body.classList.add("modal-open");
  setAuthMode(currentUser ? "profile" : mode);
  if (pushRoute && location.pathname !== "/account") {
    authReturnPath = `${location.pathname}${location.search}`;
    history.pushState({}, "", "/account");
  }
}

function closeAuthModal() {
  authView?.classList.add("hidden");
  document.body.classList.remove("modal-open");
  if (location.pathname === "/account") {
    history.pushState({}, "", authReturnPath || "/");
  }
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  const isProfile = mode === "profile";
  registerForm?.classList.toggle("hidden", !isRegister);
  loginForm?.classList.toggle("hidden", isRegister || isProfile);
  profileForm?.classList.toggle("hidden", !isProfile);
  document.querySelector(".auth-tabs")?.classList.toggle("hidden", isProfile);
  registerTab?.classList.toggle("active", isRegister);
  loginTab?.classList.toggle("active", mode === "login");
  if (isProfile) {
    if (authTitle) authTitle.textContent = t("profileTitle");
    if (authIntro) authIntro.textContent = t("profileIntro");
    if (profileNameInput) profileNameInput.value = currentUser?.name || "";
    if (profileUsernameInput) profileUsernameInput.value = currentUser?.username ? `@${currentUser.username}` : "";
  } else {
    if (authTitle) authTitle.textContent = t("authTitle");
    if (authIntro) authIntro.textContent = t("authIntro");
  }
  setAuthMessage("");
}

function setAuthMessage(message) {
  if (authMessage) authMessage.textContent = message;
}

function showFirstRunModal() {
  if (localStorage.getItem("screen2me:howToSeen")) return;
  window.setTimeout(openHowToModal, 350);
}

function openHowToModal() {
  if (!howToModal) return;
  howToModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  trackEvent("how_to_opened");
}

function closeHowToModal() {
  if (!howToModal) return;
  howToModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  localStorage.setItem("screen2me:howToSeen", "true");
  trackEvent("how_to_closed");
}

function trackEvent(eventName, metadata = {}) {
  const payload = {
    eventName,
    roomId,
    path: location.pathname,
    metadata: {
      ...metadata,
      language,
      role
    }
  };

  fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => {});
}
