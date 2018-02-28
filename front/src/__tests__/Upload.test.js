it('When image upload succeeds, it returns without error', () => {
  // something
	mock(uploadImage, filestack.upload, ()=> return {status: "OK"});

	const result = uploadImage('image');
	expect(result).toBe();
});

it('When image upload fails, it returns the error code', () => {
  // something
});

it('When input is not a file, it returns ___ error', () => {
  // something
});

it('When image is wrong format, it returns ___ error', () => {
  // something
});

function uploadImage(src){
	uploadingImage = true;
	const res = filestack.upload(src);
	
	if (error) {
		return "There was an error";
	}
	else if (res === 'undefined'){
		return "Upload failed";
	}
	else if (status === "OK"){
		return "Upload succeeded"
	}
	return "Upload failed";
}


