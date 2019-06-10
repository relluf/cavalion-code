define(function() {
	
	/*	asArray(arrLike) - 
	
		used while processing XML files when a sequence 
		of elements is expected:
	
			var root = parse(xml);
			
			asArray(root.children).map( .... )
	
	*/
	
	return (_) => (_ instanceof Array ? _ : (_ !== undefined && _ !== null ? [_] : []));
});