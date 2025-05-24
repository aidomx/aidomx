export const footer = (port: number = 35729) => `
  <script>
    const protocol = location.protocol === "https:" ? "wss" : "ws"
    const hostname = location.hostname
    const port = 35729
    const url = protocol + "://" + hostname + ":" + ${port}

    const ws = new WebSocket(url)
    ws.onmessage = (event) => {
      if (event.data === "reload") location.reload()
    }
  </script>
</body>
</html>
`
