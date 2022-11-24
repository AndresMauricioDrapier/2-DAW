export class Http {
    async ajax<T>(method: string, url: string, headers?: HeadersInit, body?: string): Promise<T> {
        const resp = await fetch(url, { method, headers, body });
  
        if (!resp.ok) throw new Error(resp.statusText);
  
        if (resp.status != 204) {
            return resp.json(); // promise
        } else {
            return null;
        }
    }
  
    get<T>(url: string) {
        return this.ajax<T>("GET", url);
    }
  
    post<T>(url: string, data: any) {
        return this.ajax<T>(
            "POST",
            url,
            { "Content-Type": "application/json" },
            JSON.stringify(data)
        );
    }
  
    put<T>(url: string, data: any) {
        return this.ajax<T>(
            "PUT",
            url,
            { "Content-Type": "application/json" },
            JSON.stringify(data)
        );
    }
  
    delete<T>(url: string) {
        return this.ajax<T>("DELETE", url);
    }
}
  