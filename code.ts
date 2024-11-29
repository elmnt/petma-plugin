figma.showUI(__html__);

figma.ui.resize(500,700);

figma.ui.onmessage = async(pluginMessage) => {

	// Need to load this because it's used in the tutorial's Figma file
	// Also wrap the main pluginMessage function with async to complete
	await figma.loadFontAsync({ family: "Rubik", style: "Regular" });

	// create array so we can focus and zoom to the new instance when it's created
	const nodes:SceneNode[] = [];

	figma.loadAllPagesAsync();
	// eslint-disable-next-line @figma/figma-plugins/dynamic-page-find-method-advice
	const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;

	let selectedVariant;

	if(pluginMessage.darkModeState === true){
		switch(pluginMessage.imageVariant){
			case "2" :
				selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
				break;
			case "3" :
				selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
				break;
			default :
				selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
				break;
		}
	} else {
		// defaultVariant.createInstance();
		switch(pluginMessage.imageVariant){
			case "2" :
				selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
				break;
			case "3" :
				selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
				break;
			default :
				// don't need this one
				// selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=false") as ComponentNode;
				selectedVariant = postComponentSet.defaultVariant as ComponentNode;
				break;
		}		
	}

	// Populate the new instance with form values
	const newPost = selectedVariant.createInstance();
	const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
	const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
	const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;

	templateName.characters = pluginMessage.name;
	templateUsername.characters = pluginMessage.username;
	templateDescription.characters = pluginMessage.description;

	nodes.push(newPost);
	figma.viewport.scrollAndZoomIntoView(nodes);

	// This might not be necessary
	figma.on('close', function() { 
		figma.closePlugin();
		console.log("CLOSED");
	});

};
