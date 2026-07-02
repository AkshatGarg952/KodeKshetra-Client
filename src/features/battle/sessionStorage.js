const SESSION_KEYS = {
  battleData: "battleData",
  roomId: "roomId",
  serverTimeOffsetMs: "serverTimeOffsetMs",
  matchmakingQueuedServerNow: "matchmakingQueuedServerNow",
  isWaiting: "isWaiting",
  battleResultNote: "battleResultNote",
  battleResultDetails: "battleResultDetails",
};

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getStoredBattle(navigationBattle) {
  return navigationBattle || parseJson(sessionStorage.getItem(SESSION_KEYS.battleData), {});
}

export function getStoredRoomId(navigationRoomId) {
  if (navigationRoomId !== undefined && navigationRoomId !== null) {
    return navigationRoomId;
  }

  return parseJson(sessionStorage.getItem(SESSION_KEYS.roomId), null);
}

export function getStoredServerTimeOffset() {
  const rawValue = sessionStorage.getItem(SESSION_KEYS.serverTimeOffsetMs);
  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function getStoredMatchmakingQueuedServerNow() {
  const rawValue = sessionStorage.getItem(SESSION_KEYS.matchmakingQueuedServerNow);
  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function getStoredWaitingState() {
  return sessionStorage.getItem(SESSION_KEYS.isWaiting) === "true";
}

export function getStoredBattleNote() {
  return sessionStorage.getItem(SESSION_KEYS.battleResultNote) || "";
}

export function getStoredBattleResultDetails() {
  return parseJson(sessionStorage.getItem(SESSION_KEYS.battleResultDetails), null);
}

export function persistBattleContext(battle, roomId) {
  if (battle) {
    sessionStorage.setItem(SESSION_KEYS.battleData, JSON.stringify(battle));

    if (typeof battle.serverTimeOffsetMs === "number" && Number.isFinite(battle.serverTimeOffsetMs)) {
      sessionStorage.setItem(SESSION_KEYS.serverTimeOffsetMs, JSON.stringify(battle.serverTimeOffsetMs));
    } else {
      sessionStorage.removeItem(SESSION_KEYS.serverTimeOffsetMs);
    }
  }

  if (roomId !== undefined && roomId !== null) {
    sessionStorage.setItem(SESSION_KEYS.roomId, JSON.stringify(roomId));
  }
}

export function persistMatchmakingQueuedServerNow(serverNow) {
  if (Number.isFinite(Number(serverNow))) {
    sessionStorage.setItem(SESSION_KEYS.matchmakingQueuedServerNow, JSON.stringify(Number(serverNow)));
    return;
  }

  sessionStorage.removeItem(SESSION_KEYS.matchmakingQueuedServerNow);
}

export function persistWaitingState(isWaiting) {
  if (isWaiting) {
    sessionStorage.setItem(SESSION_KEYS.isWaiting, "true");
    return;
  }

  sessionStorage.removeItem(SESSION_KEYS.isWaiting);
}

export function persistBattleResult(note, details = null) {
  sessionStorage.setItem(SESSION_KEYS.battleResultNote, note || "");

  if (details) {
    sessionStorage.setItem(SESSION_KEYS.battleResultDetails, JSON.stringify(details));
    return;
  }

  sessionStorage.removeItem(SESSION_KEYS.battleResultDetails);
}

export function clearBattleSession() {
  Object.values(SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
}
