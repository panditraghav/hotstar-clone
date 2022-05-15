export function saveAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken)
}

export function removeAccessToken() {
    localStorage.removeItem("accessToken")
}

export function getAccessToken(): string {
    return localStorage.getItem("accessToken")
}