figma.showUI(__html__);

figma.ui.resize(500,800);

figma.ui.onmessage = pluginMessage => {

	figma.loadAllPagesAsync();
	// eslint-disable-next-line @figma/figma-plugins/dynamic-page-find-method-advice
	const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
	const defaultVariant = postComponentSet.defaultVariant as ComponentNode;

	defaultVariant.createInstance();

	console.log(postComponentSet);
	console.log(postComponentSet.children);
	console.log(postComponentSet.name);

	/* First message handler tests */
	console.log(pluginMessage.username);
	console.log(pluginMessage.name);
	console.log(pluginMessage.description);
	console.log(pluginMessage.darkModeState);
	console.log(pluginMessage.imageVariant);

	if(pluginMessage.darkModeState === true){
		console.log("DARK MODE");
	} else {
		console.log("LIGHT MODE");
	}

	// This might not be necessary
	figma.on('close', function() { 
		figma.closePlugin();
		console.log("CLOSED");
	});

};
