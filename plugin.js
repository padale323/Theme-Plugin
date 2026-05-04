// @request-earlyload

(function() { // Wrap in an IIFE to keep the global scope clean

    // Helper function to save a color to a cookie that lasts for 10 years
    function saveColor(name, value) {
        // Set cookie: name=value; max-age is 10 years in seconds; path=/ makes it available site-wide
        document.cookie = `${name}=${value}; max-age=315360000; path=/`; 
    }

    // Helper function to retrieve a specific cookie value by its name
    function getCookie(name) {
        const value = `; ${document.cookie}`; // Prefix with semicolon for easier string splitting
        const parts = value.split(`; ${name}=`); // Split the cookie string at the specific name
        if (parts.length === 2) return parts.pop().split(';').shift(); // Pop the value out and clean it
    }

    // Function to check if the user's input is a valid CSS color string
    function validColor(value) {
        const s = new Option().style; // Create a dummy style object in memory
        s.color = value;              // Try to set the color property
        return s.color !== "";        // If it's valid, the browser will store it; if not, it stays empty
    }

    // --- Startup Logic: Check for and apply saved themes ---
    const savedBg = getCookie("terminal_bg"); // Check cookies for a saved background
    const savedText = getCookie("terminal_glow"); // Check cookies for a saved text color

    if (savedBg) document.documentElement.style.setProperty("--bg", savedBg); // Apply saved background if found
    if (savedText) document.documentElement.style.setProperty("--glow", savedText); // Apply saved text color if found

    // Register the "bg" (background) command
    window.registerCommand(
        "bg", // The command keyword
        "Changes background color. Use --non-permanent to avoid saving.", // Help text description
        function(args) { // Function that runs when the command is called
            if (!args) return print("Provide a color."); // Error if no arguments are provided
            
            const isPermanent = !args.includes("--non-permanent"); // Check if the user wants to save this
            const color = args.replace("--non-permanent", "").trim(); // Remove the flag to isolate the color name

            if (!validColor(color)) return print("Invalid color format."); // Validate the isolated color string
            
            document.documentElement.style.setProperty("--bg", color); // Update the CSS variable in real-time
            
            if (isPermanent) { // If the user didn't use the --non-permanent flag...
                saveColor("terminal_bg", color); // Save it to a 10-year cookie
                print(`Background updated and saved: ${color}`); // Success message for permanent change
            } else {
                print(`Background updated (temporary): ${color}`); // Success message for temporary change
            }
        }
    );

    // Register the "text" (glow) command
    window.registerCommand(
        "text", // The command keyword
        "Changes text color. Use --non-permanent to avoid saving.", // Help text description
        function(args) { // Function that runs when the command is called
            if (!args) return print("Provide a color."); // Error if no arguments are provided
            
            const isPermanent = !args.includes("--non-permanent"); // Determine if we should save to cookies
            const color = args.replace("--non-permanent", "").trim(); // Clean the flag out of the string

            if (!validColor(color)) return print("Invalid color format."); // Validate the CSS color
            
            document.documentElement.style.setProperty("--glow", color); // Update the CSS variable in real-time
            
            if (isPermanent) { // If it is meant to be a permanent change...
                saveColor("terminal_glow", color); // Save to a 10-year cookie
                print(`Text color updated and saved: ${color}`); // Success message
            } else {
                print(`Text color updated (temporary): ${color}`); // Success message
            }
        }
    );


})(); // Close and execute the IIFE
