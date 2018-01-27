var colors = ["#0A0F1A", "#141F33", "#1F2E4C", "#293D66", "#334C80", "#3D5C99", "#476BB2", "#527ACC", "#5C8AE6", "#6699FF", "#75A3FF", "#85ADFF", "#94B8FF", "#A3C2FF", "#B2CCFF", "#C2D6FF", "#D1E0FF", "#E0EBFF"];


var xml = [];

colors.forEach(function(c, i) {
    
    xml.push('<Rule>');
    xml.push('	<ogc:Filter>');
    xml.push('		<ogc:PropertyIsBetween>');
    xml.push('			<ogc:PropertyName>value</ogc:PropertyName>');
    xml.push('        		<ogc:LowerBoundary>');
    xml.push('            		<ogc:Literal>' + ('' + (45 - (i * 3))) + '</ogc:Literal>');
    xml.push('        		</ogc:LowerBoundary>');
    xml.push('        		<ogc:UpperBoundary>');
    xml.push('            		<ogc:Literal>' + ('' + (48 - (i * 3))) + '</ogc:Literal>');
    xml.push('        		</ogc:UpperBoundary>');
    xml.push('		</ogc:PropertyIsBetween>');
    xml.push('	</ogc:Filter>');
    xml.push('	<PolygonSymbolizer>');
    xml.push('		<Fill>');
    xml.push('			<CssParameter name="fill">' + c + '</CssParameter>');
    xml.push('		</Fill>');
    xml.push('		<Stroke>');
    xml.push('			<CssParameter name="stroke">' + c + '</CssParameter>');
    xml.push('			<CssParameter name="stroke-width">3</CssParameter>');
    xml.push('		</Stroke>');
    xml.push('	</PolygonSymbolizer>');
    xml.push('</Rule>');
    
});

require("js/JsObject").$[82].setValue(xml.join("\n"));
