(function() { // Wrap in an IIFE to prevent variable "leakage" into the global scope

    // Function to check if a string is a valid CSS color
    function validColor(value) {
        const s = new Option().style; // Create a temporary, unrendered HTML element style object
        s.color = value;              // Try to apply the user's input as a color
        return s.color !== "";        // If the browser accepts it, the string won't be empty
    }

    // Register the "bg" command to the terminal's system
    window.registerCommand(
        "bg",                         // The keyword the user types
        "Changes the background color.", // The description for the help menu
        function(args) {              // The function that runs when "bg" is called
            if (!args) return print("Provide a color."); // Error if no color is typed
            if (!validColor(args)) return print("Invalid color format."); // Error if color is fake
            document.documentElement.style.setProperty("--bg", args); // Update the CSS variable --bg
            print(`Background color updated to ${args}.`); // Feedback sent to the terminal
        }
    );

    // Register the "text" command to the terminal's system
    window.registerCommand(
        "text",                       // The keyword the user types
        "Changes the text glow color.", // The description for the help menu
        function(args) {              // The function that runs when "text" is called
            if (!args) return print("Provide a color."); // Check for missing arguments
            if (!validColor(args)) return print("Invalid color format."); // Validate CSS color
            document.documentElement.style.setProperty("--glow", args); // Update the CSS variable --glow
            print(`Text color updated to ${args}.`); // Feedback sent to the terminal
        }
    );

})(); // Close and immediately execute the function
