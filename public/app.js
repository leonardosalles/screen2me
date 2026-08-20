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
    chooseScreen: "Escolha a tela ou janela para compartilhar.",
    sharing: "Transmitindo tela.",
    shareCancelled: "Compartilhamento cancelado.",
    cannotStart: "Nao foi possivel iniciar.",
    connectingHost: "Conectando ao apresentador...",
    waitingHost: "Aguardando apresentador.",
    viewerConnected: "Alguem entrou na sala.",
    hostSharedBy: "{name} compartilhou a tela.",
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
    accountCtaText: "Guarde historico, reserve um @username e use seu link fixo /@username/live. O app continua gratuito.",
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
    emptyHostLive: "Sua tela esta sendo enviada. O preview local fica oculto para evitar o efeito infinito.",
    emptyViewerTitle: "Aguardando",
    emptyWaiting: "Aguardando o apresentador iniciar.",
    emptyNoHost: "Nao tem ninguem transmitindo nessa sala agora. A aba do apresentador precisa continuar aberta.",
    emptyConnectingVideo: "Conectando video ponto a ponto...",
    emptyNoFrames: "Conectou, mas nenhum frame chegou ainda. Peca para o apresentador escolher uma tela ou janela real.",
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
    stepTwoText: "Copie o link da sala ou seu /@username/live e mande para o grupo.",
    stepThreeTitle: "Fique ao vivo",
    stepThreeText: "Mantenha esta aba aberta enquanto as pessoas assistem.",
    benefitHistoryTitle: "Historico de salas",
    benefitHistoryText: "Encontre salas e sessoes anteriores sem procurar em conversas.",
    benefitUsernameTitle: "Link fixo",
    benefitUsernameText: "Reserve um username para um link pessoal como screen2.me/@leonardo/live.",
    name: "Nome",
    email: "Email",
    username: "Username",
    usernameHint: "Use letras, numeros ou underscore. Ex: @fulano",
    password: "Senha",
    register: "Criar conta",
    login: "Entrar",
    account: "Conta",
    authTitle: "Reserve seu link fixo de compartilhamento",
    authIntro: "Crie uma conta para guardar historico de salas e reservar um link como screen2.me/@leonardo/live.",
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
    chooseScreen: "Choose a screen or window to share.",
    sharing: "Sharing screen.",
    shareCancelled: "Screen sharing cancelled.",
    cannotStart: "Could not start sharing.",
    connectingHost: "Connecting to presenter...",
    waitingHost: "Waiting for presenter.",
    viewerConnected: "Someone joined the room.",
    hostSharedBy: "{name} shared the screen.",
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
    accountCtaText: "Save room history, reserve an @username, and use your fixed /@username/live link. The app stays free.",
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
    emptyHostLive: "Your screen is being sent. Local preview stays hidden to avoid the infinite mirror.",
    emptyViewerTitle: "Waiting",
    emptyWaiting: "Waiting for the presenter to start.",
    emptyNoHost: "Nobody is presenting in this room right now. The presenter tab must stay open.",
    emptyConnectingVideo: "Connecting peer-to-peer video...",
    emptyNoFrames: "Connected, but no frames arrived yet. Ask the presenter to choose a real screen or window.",
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
    stepTwoText: "Copy the room link or your /@username/live and send it to your group.",
    stepThreeTitle: "Stay live",
    stepThreeText: "Keep this tab open while people are watching.",
    benefitHistoryTitle: "Room history",
    benefitHistoryText: "Find past rooms and sessions without digging through chats.",
    benefitUsernameTitle: "Fixed share link",
    benefitUsernameText: "Reserve a username for a personal link like screen2.me/@leonardo/live.",
    name: "Name",
    email: "Email",
    username: "Username",
    usernameHint: "Use letters, numbers, or underscores. Ex: @alex",
    password: "Password",
    register: "Register",
    login: "Login",
    account: "Account",
    authTitle: "Reserve your fixed sharing link",
    authIntro: "Create an account to keep room history and claim a link like screen2.me/@leonardo/live.",
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
let roomId = params.get("roomId") || params.get("room") || getLiveRoomFromPath();
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
const peers = new Map();
const pendingCandidates = new Map();

applyLanguage(language);
registerServiceWorker();
setupCurrentRoute();
loadSession().then(() => {
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
video.addEventListener("webkitbeginfullscreen", updateFullscreenButton);
video.addEventListener("webkitendfullscreen", updateFullscreenButton);
window.addEventListener("beforeunload", () => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "leave-room" }));
  }
});
window.addEventListener("popstate", setupCurrentRoute);
window.addEventListener("orientationchange", () => {
  if (isPseudoFullscreen()) window.setTimeout(updateFullscreenButton, 250);
});

async function connect() {
  if (!location.host || location.protocol === "file:") {
    setStatusKey("openFromServer");
    setEmptyHint("serverRequired");
    shareButton.disabled = true;
    return;
  }

  if (socket && [WebSocket.CONNECTING, WebSocket.OPEN].includes(socket.readyState)) return;

  setStatusKey("connectingServer");
  socket = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}`);

  socket.addEventListener("open", () => {
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
      hostDisplayName = message.host?.displayName || null;
      if (message.hostOnline && hostDisplayName) {
        setStatus(format("hostSharedBy", { name: hostDisplayName }));
        setStageSubtitle(format("hostSharedBy", { name: hostDisplayName }));
      } else {
        setStatusKey(message.hostOnline ? "connectingHost" : "waitingHost");
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
      hostId = message.hostId;
      hostDisplayName = message.host?.displayName || null;
      setStatus(hostDisplayName ? format("hostSharedBy", { name: hostDisplayName }) : t("connectingHost"));
      setStageSubtitle(hostDisplayName ? format("hostSharedBy", { name: hostDisplayName }) : "");
    }

    if (message.type === "host-left") {
      cleanupPeers();
      video.srcObject = null;
      video.classList.remove("is-playing");
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
    setStatusKey("connectionLost");
  });
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
      video: { frameRate: 30 },
      audio: false
    });
    trackEvent("share_permission_granted");

    video.srcObject = null;
    video.classList.remove("is-playing");
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
  video.srcObject = null;
  video.classList.remove("is-playing");
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
  localStream.getTracks().forEach((track) => peer.addTrack(track, localStream));
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  sendSignal(viewerId, peer.localDescription);
}

async function handleSignal(from, signal) {
  const peer = peers.get(from) || createPeer(from);

  if (signal.type === "offer") {
    hostId = from;
    await peer.setRemoteDescription(signal);
    await flushPendingCandidates(from, peer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    sendSignal(from, peer.localDescription);
    return;
  }

  if (signal.type === "answer") {
    await peer.setRemoteDescription(signal);
    await flushPendingCandidates(from, peer);
    return;
  }

  if (signal.candidate) {
    if (!peer.remoteDescription) {
      queueCandidate(from, signal);
      return;
    }
    await peer.addIceCandidate(signal);
  }
}

function createPeer(peerId) {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  });

  peers.set(peerId, peer);

  peer.addEventListener("icecandidate", (event) => {
    if (event.candidate) sendSignal(peerId, event.candidate);
  });

  peer.addEventListener("track", (event) => {
    showRemoteStream(event.streams[0]);
    setMode("live");
    liveDot.classList.add("on");
    setBadge("live");
    setStatusKey("connectingHost");
  });

  peer.addEventListener("connectionstatechange", () => {
    if (peer.connectionState === "connecting" && role === "viewer") {
      setEmptyHint("emptyConnectingVideo");
    }
    if (["closed", "failed", "disconnected"].includes(peer.connectionState)) {
      closePeer(peerId);
    }
  });

  return peer;
}

async function showRemoteStream(stream) {
  video.srcObject = stream;
  video.muted = true;
  video.classList.remove("is-playing");
  emptyState.classList.remove("hidden");
  setEmptyTitle("emptyViewerTitle");
  setEmptyHint("emptyConnectingVideo");

  try {
    await video.play();
  } catch (error) {
    console.error("Remote video play failed", error);
  }

  waitForVideoFrame();
}

function waitForVideoFrame() {
  const startedAt = Date.now();

  function markPlaying() {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      video.classList.add("is-playing");
      emptyState.classList.add("hidden");
      setStatusKey("watching");
      trackEvent("video_playing", { width: video.videoWidth, height: video.videoHeight });
      return true;
    }
    return false;
  }

  if (markPlaying()) return;

  if ("requestVideoFrameCallback" in video) {
    video.requestVideoFrameCallback(() => markPlaying());
  }

  const interval = window.setInterval(() => {
    if (markPlaying()) {
      window.clearInterval(interval);
      return;
    }

    if (Date.now() - startedAt > 5000) {
      window.clearInterval(interval);
      setStatusKey("watching");
      setEmptyHint("emptyNoFrames");
    }
  }, 250);
}

function sendSignal(to, signal) {
  socket.send(JSON.stringify({ type: "signal", to, signal }));
}

function closePeer(peerId) {
  peers.get(peerId)?.close();
  peers.delete(peerId);
  pendingCandidates.delete(peerId);
}

function cleanupPeers() {
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
    ? new URL(`/@${currentUser.username}/live`, window.location.origin).toString()
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
  setStatus(t(statusKey));
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
    setPseudoFullscreen(true);
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
    return;
  }

  setPseudoFullscreen(true);
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

  setPseudoFullscreen(false);
  updateFullscreenButton();
}

function isFullscreen() {
  return Boolean(
    document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      video.webkitDisplayingFullscreen ||
      isPseudoFullscreen()
  );
}

function isPseudoFullscreen() {
  return screenFrame.classList.contains("is-pseudo-fullscreen");
}

function setPseudoFullscreen(enabled) {
  screenFrame.classList.toggle("is-pseudo-fullscreen", enabled);
  document.body.classList.toggle("pseudo-fullscreen-open", enabled);
  updateFullscreenButton();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
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

function getLiveRoomFromPath() {
  const match = location.pathname.match(/^\/@([a-z0-9_]{3,40})\/live\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

function setupCurrentRoute() {
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
