# Website Used Fonts Analyzer Bookmarklet
Analyze a webpage to detect what font families are used on the page.

## Usage
This script will process the current web page and identify what font families are used and on what elements.

This allows you to quickly identify if certain font files are used more heavily than others, consistency of font family naming, etc.

## How to Use
### One Time Setup
- Create a bookmark in your browser:
  - Name
  
          PromInc Font Analyzer

  - URL
  
          javascript:(function(){ if(!document.getElementById('PromIncFontAnalyzer')){ var fontAnalyzer=document.createElement('script'); fontAnalyzer.src='http://promincproductions.com/seotools/fontanalyzer/fonts_used_analyzer.js'; fontAnalyzer.id='PromIncFontAnalyzer'; document.body.appendChild(fontAnalyzer); fontAnalyzer.onload = function() { analyzeFonts(); } } else { analyzeFonts(); } })();

### Daily Usage
- View the web page you wish to analyze
- Click on the bookmarklet.  The script will analzye your page and generate a report explaining which fonts are used and where on the page.
