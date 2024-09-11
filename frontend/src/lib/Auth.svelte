<script lang="ts">
    import { Auth } from "@auth/core";
    // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const BACKEND_URL = 'https://wecqhvbkol.a.pinggy.link'
    let token = ''
    let di = ''
    async function login(){
        const { csrfToken }: { csrfToken: string } = await fetch(
            `${BACKEND_URL}/auth/csrf`,
            {
            credentials: "include",
            }
        ).then((res) => {
            return res.json();
        });
        console.log('csrfToken', csrfToken)
        console.log('BACKEND_URL', `${BACKEND_URL}/auth/callback/cognito`)
        const { url }: { url: string } = await fetch(
            `${BACKEND_URL}/auth/signin/cognito`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                csrfToken,
                json: "true",
                callbackUrl: `${BACKEND_URL}/auth/callback/cognito`,
            }),
            redirect: "follow",
            credentials: "include",
            }
        ).then((res) => res.json());
        di = url
        console.log('url', url)
        // alert('login', url)
    }

    async function get_csrf_token(){
        const response = await fetch(`${BACKEND_URL}/auth/csrf`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
        const data = await response.json()
        console.log(data)
        token = data.csrfToken
    }
 
    // async function me(){

    //     const result = await fetch(`/api/me`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         // body: JSON.stringify({ csrfToken: token }),
    //     })
    // }
    let result = ''
    async function me(){
        const response = await fetch(`${BACKEND_URL}/api/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const data = await response.json()
        result = JSON.stringify(data)
    }
  
    import { Browser } from '@capacitor/browser';

    const openCapacitorSite = async () => {
        await Browser.open({ url: `${BACKEND_URL}/auth/signin` });
    };
    const openMe = async () => {
        await Browser.open({ url: `${BACKEND_URL}/api/me` });
    };

    // const test_button = async () => {
    //     const ee = await Browser.addListener('browserFinished', (event) => {
    //         console.log('Browser has been closed', event);
    //     });
    // }
//  console.log(response instanceof Response) // true
</script>

<main>
    <!-- {token} -->
    <!-- <p><button on:click={get_csrf_token}>csrf</button></p>
    <p><button on:click={me}>me</button></p> -->
    <!-- {url} -->
    {di}
    <p><button on:click={me}>me!</button></p>
    <p><button on:click={openCapacitorSite}>Open Capacitor Site</button></p>
    <p><button on:click={openMe}>Open Me</button></p>
    <p><button on:click={login}>Login</button></p>
    <!-- <p><button</p> -->
    <form action={`${BACKEND_URL}/auth/signin`} method="post">
        <!-- <input type="hidden" name="csrf-token" value={token} /> -->
        <button type="submit">Sign in</button>
    </form>
    <pre>
        {result}
    </pre>
</main>
