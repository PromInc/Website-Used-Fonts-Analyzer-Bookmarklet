/**
* Website Used Fonts Analyzer Bookmarklet
* 
* A bookmarklet to quickly analyze the fonts used on the current web page
* 
* @author PromInc
* @email prominc@hotmail.com
* @version 1.1
* @date 2016-12-09
*/

function analyzeFonts() {
// http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
String.prototype.hashCode = function() {
	var hash = 0, i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

var includeTypes = new Array( "div", "span", "text", "p", "a", "i", "b", "h1", "h2", "h3", "h4", "h5", "h6", "header", "footer", "address" );

// Get all tags in the document
var allElements = document.getElementsByTagName("*");

// Define arrays
var usedFontFamilies = {};

// Define HTML output variables
var outputHtml = "";
var outputHtmlHead = "";
var outputHtmlFoot = "";
var outputElementsHtml = "";
var fontFamiliesHtml = "";

// Build element output
outputElementsHtml += "<h2>Font Usage by Element</h2>";
outputElementsHtml += "<div id=\"elements\">";
for (var i=0, max=allElements.length; i < max; i++) {
	// Get this element
	var thisElement = allElements[i];

	// Only process allowed tag types
	if( includeTypes.indexOf( thisElement.tagName.toLowerCase() ) != -1 ) {
		// If this element includes HTML
		if( !thisElement.innerHTML.trim().match( /^<[a-z][\s\S]*>/i ) ) {
			// get font used
			var elementFont = getSetCssStyle( thisElement, 'font-family' );

			// Add font family to array if not already in it
			if( !usedFontFamilies[ elementFont ] ) {
				usedFontFamilies[ elementFont ] = 1;
			} else {
				usedFontFamilies[ elementFont ] = usedFontFamilies[ elementFont ] + 1;
			}

			// Cleanup for HTML output
			var elementTypeOpen = thisElement.outerHTML.substring( 0, thisElement.outerHTML.indexOf('>')+1 );
			var elementForReport = elementTypeOpen +
									" ... " +
									( elementTypeOpen.indexOf(' ') != -1 ? 
										"</" + elementTypeOpen.substring( elementTypeOpen.indexOf('<')+1, elementTypeOpen.indexOf(' ') ) + ">"
										:
										"</" + elementTypeOpen.substring( elementTypeOpen.indexOf('<')+1, elementTypeOpen.indexOf('>') ) + ">"
									);
			elementForReport = elementForReport.replace(/</g,"&lt;").replace(/>/g,"&gt;");

			// Generate output HTML
			outputElementsHtml += "<div class=\"parent\" fontFamilyHash=\"fontFamily-" + elementFont.hashCode() + "\">";
				outputElementsHtml += "<div>";
					outputElementsHtml += "<div><b>Element:</b> <span>" + elementForReport + "</span></div>";
					outputElementsHtml += "<div><b>Font Name:</b> <span>" + elementFont + "</span></div>";
				outputElementsHtml += "</div>";
			outputElementsHtml += "</div>";
		}
	}
}
outputElementsHtml += "</div>";

// output HTML head
outputHtmlHead += "<html>";
outputHtmlHead += "<head>";
	outputHtmlHead += "<style>";
		outputHtmlHead += "<!--";
			outputHtmlHead += "body { font-family: Arial, sans-serif; margin: 0; }";
			outputHtmlHead += "#siteContainer, h1 { padding: .5% 1%; }";
			outputHtmlHead += "h1 { background-color: #a5ceff; margin-bottom: 0; }";
			outputHtmlHead += "h2:not(:first-child) { margin-top: 1.5em; }";
			outputHtmlHead += "h2 { border-bottom: 1px solid #000000; margin-bottom: .5em; }";
			outputHtmlHead += "div.parent { margin-bottom: 15px; }";
			outputHtmlHead += ".action { cursor: pointer; background-color: #73d473; display: inline-block; padding: .25%; margin: .2% 0 .2% .5%; color: #2d2804; font-size: .75em; font-weight: bold; }";
			outputHtmlHead += "#showAllElements.action { margin: 0 0 .5%; }";
		outputHtmlHead += "-->";
	outputHtmlHead += "</style>";
	outputHtmlHead += "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js\"></script>";
outputHtmlHead += "</head>";
outputHtmlHead += "<body>";
	outputHtmlHead += "<h1>Font Families Used Report</h1>";
	outputHtmlHead += "<div id=\"siteContainer\">";

	// output HTML footer
	outputHtmlFoot += "</div>";
	outputHtmlFoot += "<script type=\"text/javascript\">";
		outputHtmlFoot += "function showElements( fontFamilyHash ) {";
			outputHtmlFoot += "if( typeof fontFamilyHash !== 'undefined' ) {";
				outputHtmlFoot += "jQuery(\"#elements div.parent\").hide();";
				outputHtmlFoot += "jQuery(\"#elements\").find(\"[fontFamilyHash=fontFamily-\" + fontFamilyHash + \"]\").show();";
				outputHtmlFoot += "jQuery(\"#showAllElements\").show();";
			outputHtmlFoot += "} else {";
				outputHtmlFoot += "jQuery(\"#elements div.parent\").show();";
				outputHtmlFoot += "jQuery(\"#showAllElements\").hide();";
			outputHtmlFoot += "}";
		outputHtmlFoot += "}";
	outputHtmlFoot += "</script>";
outputHtmlFoot += "</body>";
outputHtmlFoot += "</html>";

// Compile HTML for font familes used
fontFamiliesHtml += "<div>";
	fontFamiliesHtml += "<h2>Font Families Used (" + Object.keys(usedFontFamilies).length + ")</h2>";
	fontFamiliesHtml += "<div id=\"showAllElements\" class=\"action\" style=\"display:none;\" onclick=\"showElements();\">Show all elements</div>";
	for( var fontFamily in usedFontFamilies ) {
		if(usedFontFamilies.hasOwnProperty(fontFamily)) {
			fontFamiliesHtml += "<div class=\"parent\">";
				fontFamiliesHtml += "<b>Font Name:</b>";
				fontFamiliesHtml += "<div>";
					fontFamiliesHtml += fontFamily + " (" + usedFontFamilies[fontFamily] + " instances)";
					fontFamiliesHtml += "<div class=\"action\" onclick=\"showElements('" + fontFamily.hashCode() + "');\">Show only elements using this font</div>";
				fontFamiliesHtml += "</div>";
			fontFamiliesHtml += "</div>";
		}
	}
fontFamiliesHtml += "</div>";

// Build final output HTML
outputHtml = outputHtmlHead + fontFamiliesHtml + outputElementsHtml + outputHtmlFoot;

// Open report
var reportWindow = window.open('scrollbars=1');
reportWindow.document.write( outputHtml );

// Get elements CSS style
function getSetCssStyle( element, property ) {
	return window.getComputedStyle( element, null ).getPropertyValue( property );
}
}
