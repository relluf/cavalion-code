Entity: Def
	id: id
	created: timestamp
	modified: timestamp
	archived: timestamp
	deleted: timestamp
Onderzoek: Entity
	naam: string(64)
	projectcode: string(32)
	classificatie: ref(type/Classificatie)
	status: ref(type/Onderzoekstatus)
	opmerking: text
	conclusie: text
	fotos: set(Foto)
Meetpunt: Entity
	code: string(16)
	type: ref(type/Meetpunt)
	datum: timestamp
	maaiveld:
		type: ref(type/Situatiebeschrijving)
		hoogte: number
		referentie: ref(type/Referentievlak) # altijd mv?
	gws: number # tov mv
	glg: number # tov mv
	ghg: number # tov mv (hier wel)
	locatie:
		x: number # meter tov Parijs
		y: number # meter tov Parijs
		longitude: numver
		latitude: number
		altitude: number
		altitude_accuracy: number
		heading: number
		accuracy: number
		speed: number
		time: number
	apparaat: ref(type/Apparaat)
	boormeester: ref(Subject)
	fotos: set(Foto)
	afwerkingen: set(Afwerking), cascade(remove)
	casingen: set(Casing)
	bodemlagen: set(Bodemlaag; cascase: remove;)
	bodemmonsters: set(Bodemmonster), cascade(remove)
	peilbuizen: set(Peilbuis), cascade(remove) # filters?
	opmerking: string
Bodemlaag: Entity
	bovenkant: number
	onderkant: number
	lengte: number
	breedte: number
	grondsoort: ref(type/Grondsoortmatrix)
	steensoort: ref(type/Steensoort)
	schuifsterkte: ref(type/Schuifsterkte)
	pid: number
	bodemvocht: number
	apparaat: ref(type/Boorapparaat)
	diameter: number
	veldwaarnemingen: set(Veldwaarneming)
	
Veldwaarneming:
	geur: 
		type: ref(type/Geur)
		intensiteit: ref(type/Intensiteit)
		

Bodemmonster: Entity
	bovenkant: number
	onderkant: number
Peilbuis: Entity
	filter:
		bovenkant: number
		onderkant: number
	grind:
		bovenkant: number
		onderkant: number
	bentoniet:
		bovenkant: number
		onderkant: number
Watermonster: Entity
Foto: Entity
	picture: image
Type: Entity
	name: string(256)
	title: string(256)
	display: string(256)
	description: string(256)
	lookupTables: set(LookupTable)
LookupTable: Entity
	name: string
	table: map(string, string)
type/Classificatie: Type
type/Meetpunt: Type