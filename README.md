# Password Strength Checker

A modern, responsive password strength checker built with HTML, CSS, and JavaScript. This tool helps users create stronger passwords by providing real-time feedback on password strength.

## Features

- Real-time password strength checking
- Visual strength indicator (color-coded bar)
- Detailed criteria feedback with checkmarks/crosses
- Password visibility toggle
- Fully responsive design
- Clean, modern UI with smooth animations

## How It Works

The password strength is determined by these criteria:
1. At least 8 characters
2. Contains uppercase letters
3. Contains lowercase letters
4. Contains numbers
5. Contains special characters

The strength is categorized as:
- **Weak** (0-2 criteria met) - Red indicator
- **Medium** (3-4 criteria met) - Orange indicator
- **Strong** (5 criteria met) - Green indicator

## How to Run Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
   - Double-click the file in your file explorer, or
   - Right-click and select "Open with" your preferred browser

Alternatively, you can:
1. Open your browser
2. Drag and drop the `index.html` file into the browser window
3. Or use a local server:
   ```bash
   # If you have Python installed
   python -m http.server 8000
   
   # If you have Node.js installed
   npx serve
   
   # Then visit http://localhost:8000 in your browser
   ```

## Technologies Used

- HTML5
- CSS3 (with modern features like Flexbox, CSS Variables)
- Vanilla JavaScript (no external libraries)

## Browser Support

Works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

You can easily customize the colors, sizes, and animations by modifying the CSS variables in the `<style>` section of the HTML file.

## License

This project is open source and available under the MIT License.