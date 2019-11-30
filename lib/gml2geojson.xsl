<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:x="http://www.opengis.net/gml" xmlns:wfs="http://www.opengis.net/wfs">
	<xsl:output method="text" indent="no" media-type="text/plain" encoding="UTF-8"/>
	<xsl:strip-space elements="*"/>
	<xsl:strip-space elements="*:featureMember"/>
	<xsl:template match="*:FeatureCollection">
		<xsl:text>{&#xa;&#x9;"type": "FeatureCollection",&#xa;&#x9;"features": [{</xsl:text>
		<xsl:apply-templates select="*:featureMember"/>
		<xsl:text>]&#xa;}</xsl:text>
	</xsl:template>
	<xsl:template match="*:featureMember">
		<xsl:text>&#xa;&#x9;&#x9;"type": "Feature",</xsl:text>
		<xsl:for-each select="child::*">
			<xsl:text>&#xa;&#x9;&#x9;"properties": {&#xa;&#x9;</xsl:text>
			<xsl:for-each select="*:LINK_LOGOTYPE|*:LOCALITY_NAME|*:LOCALITY_POPTEXT|*:LOCALITY_POPTEXT_ENG|*:LINK_PHOTO|*:LINK_PHOTO_THUMB|*:NAME_PHOTO_COPYRIGHT">
				<xsl:variable name="single">'</xsl:variable>
				<xsl:variable name="double">"</xsl:variable>
				<xsl:variable name="value">
					<xsl:text>&#x9;&#x9;"</xsl:text>
					<xsl:value-of select="local-name(.)"/>
					<xsl:text>": "</xsl:text>
					<xsl:value-of select="translate(normalize-space(.),$double,$single)"/>
					<xsl:text>"</xsl:text>
					<xsl:choose>
						<xsl:when test="not(following-sibling::node())">
							<xsl:text>&#xa;&#x9;&#x9;},&#xa;</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:text>,&#xa;&#x9;</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:value-of select="$value"/>
			</xsl:for-each>
			<xsl:text>&#x9;&#x9;"geometry": {&#xa;</xsl:text>
			<xsl:apply-templates select="descendant::*:Point|descendant::*:Polygon"/>
			<xsl:text>&#xa;&#x9;&#x9;}&#xa;</xsl:text>
		</xsl:for-each>
		<xsl:variable name="value">
			<xsl:choose>
				<xsl:when test="not(following-sibling::node())">
					<xsl:text>&#x9;}</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>&#x9;},&#xa;&#x9;{</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:value-of select="$value"/>
	</xsl:template>
	<xsl:template match="*:LINK_LOGOTYPE|*:LOCALITY_NAME|*:LOCALITY_POPTEXT|*:LOCALITY_POPTEXT_ENG|*:LINK_PHOTO|*:LINK_PHOTO_THUMB|*:NAME_PHOTO_COPYRIGHT">
		<xsl:variable name="pos">
			<xsl:value-of select="position()"/>
		</xsl:variable>
		"<xsl:value-of select="local-name( . )"/>": "<xsl:value-of select="text()"/>"
		<xsl:text>}</xsl:text>
	</xsl:template>
	<xsl:template match="*:Polygon">
		<xsl:text>&#x9;&#x9;&#x9;"type": "Polygon",&#xa;&#x9;&#x9;&#x9;"coordinates":[&#xa;&#x9;&#x9;&#x9;&#x9;</xsl:text>
		<xsl:apply-templates/>
		<xsl:text>&#xa;&#x9;&#x9;&#x9;]</xsl:text>
	</xsl:template>
	<xsl:template match="*:Point">
		<xsl:text>&#x9;&#x9;&#x9;"type": "Point",&#xa;&#x9;&#x9;&#x9;"coordinates":</xsl:text>
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="*:MultiSurface">
		<MultiGeometry>
			<xsl:apply-templates/>
		</MultiGeometry>
	</xsl:template>
	<xsl:template match="*:exterior">
		<xsl:if test="preceding-sibling::exterior">,</xsl:if>
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="*:interior">
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="*:posList">
		<xsl:text>[</xsl:text>
		<xsl:call-template name="split">
			<xsl:with-param name="str" select="normalize-space(.)"/>
		</xsl:call-template>
		<xsl:text>]</xsl:text>
	</xsl:template>
	<xsl:template match="*:pos">
		<xsl:call-template name="split">
			<xsl:with-param name="str" select="normalize-space(.)"/>
		</xsl:call-template>
	</xsl:template>
	<xsl:template name="split">
		<xsl:param name="str"/>
		<xsl:choose>
			<xsl:when test="contains($str,' ')">
				<xsl:variable name="first">
					<xsl:value-of select="format-number(number(substring-before($str,' ')),'.000000')"/>
				</xsl:variable>
				<xsl:variable name="second">
					<xsl:value-of select="format-number(number(substring-before(substring-after(concat($str,' '),' '),' ')),'.000000')"/>
				</xsl:variable>
				<xsl:value-of select="concat('[',$second,',',$first,']')"/>
				<xsl:if test="substring-after(substring-after($str,' '),' ')">
					<xsl:text>, </xsl:text>
					<xsl:call-template name="split">
						<xsl:with-param name="str">
							<xsl:value-of select="substring-after(substring-after($str,' '),' ')"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>