# Website Used Fonts Analyzer Bookmarklet
Analyze a webpage to detect what font families are used on the page.

## Usage
This script will process the current web page and identify what font families are used and on what elements.

This allows you to quickly identify if certain font files are used more heavily than others, consistency of font family naming, etc.

## How to Use
- Copy the file ```font_file_detector.js``` to your  hosting location
- Create a bookmark in your browser and add the following code as the URL, updating the path to your hosted location:

        javascript:(function(){ if(!document.getElementById('PromIncFontAnalyzer')){ var fontAnalyzer=document.createElement('script'); fontAnalyzer.src='http://your-web-server.com/font_file_detector.js'; fontAnalyzer.id='PromIncFontAnalyzer'; document.body.appendChild(fontAnalyzer); fontAnalyzer.onload = function() { analyzeFonts(); } } else { analyzeFonts(); } })();
- View the web page you wish to analyze
- Click on the bookmarklet.  The script will analzye your page and generate a report explaining which fonts are used and where on the page.
