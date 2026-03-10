<script>
	// A minimalist secret page for the epic cats 
    const bookmarklet = `javascript:(function()%7Bconst CAT_EPIC %3D %60%0Ahttps%3A%2F%2Fmedia.tenor.com%2FKdnRtRdEt24AAAAj%2Fexplosion-missile.gif%0Ahttps%3A%2F%2Fmedia1.tenor.com%2Fm%2FVJqYwn0A6P4AAAAC%2Fexploding-cat-cat-blowing-up.gif%0Ahttps%3A%2F%2Fmedia1.tenor.com%2Fm%2F5x1_L18QtucAAAAd%2Fsilly-cat.gif%0Ahttps%3A%2F%2Fmedia.tenor.com%2FlWF4dbjLxAoAAAAj%2Fmaxwell-maxwell-cat.gif%0Ahttps%3A%2F%2Fmedia.tenor.com%2FVnFBxhEJy50AAAAj%2Fbrick-throwing-a-brick.gif%0Ahttps%3A%2F%2Fmedia1.tenor.com%2Fm%2Faw2Mkb0s-YwAAAAd%2Fsilly-reaction-meme.gif%0A%60.split('%5Cn').filter(a %3D> a)%3B%0A%0Afunction get_cat_gif()%7Breturn CAT_EPIC%5BMath.floor(Math.random() * CAT_EPIC.length)%5D%7D%0A%0Adocument.body.style.backgroundImage %3D %60url('%24%7Bget_cat_gif()%7D')%60%0AsetInterval(() %3D> %7B%0A    Array.from(document.querySelectorAll('img')).forEach(elem %3D> %7B%0A    if(!CAT_EPIC.some(a %3D> elem.src.includes(a))) elem.src %3D get_cat_gif()%3B%0A%7D)%3B%0A%0AArray.from(document.querySelectorAll('div')).forEach(elem %3D> %7B%0A    if(elem.style.backgroundImage %26%26 !CAT_EPIC.some(a %3D> elem.style.backgroundImage.includes(a))) elem.style.backgroundImage %3D %60url('%24%7Bget_cat_gif()%7D')%60%0A%7D)%3B%0A%0A    Array.from(document.querySelectorAll('video')).forEach(elem %3D> %7B%0A    if(!CAT_EPIC.some(a %3D> elem.poster.includes(a)) %7C%7C !elem.src.includes('takenover'))%7B%0A    elem.innerHTML %3D ""%3B%0A    elem.poster %3D get_cat_gif()%3B%0A    elem.setAttribute('src'%2C 'takenover')%3B%7D%0A%7D)%3B%0A%7D%2C 100)%3B%7D)()%3B`;
</script>

<style>
	.container {
		font-family: sans-serif;
		max-width: 600px;
		margin: 60px auto;
		padding: 20px;
		line-height: 1.6;
		text-align: center;
	}
	.bookmarklet {
		display: inline-block;
		padding: 12px 24px;
		background-color: #2c3e50;
		border: 1px solid #1a252f;
		text-decoration: none;
		color: #ffffff;
		font-size: 1.2rem;
		font-weight: bold;
		border-radius: 6px;
		margin: 30px 0;
		cursor: grab;
	}
	.instructions {
		text-align: left;
		margin: 20px auto;
		max-width: 400px;
		background: #f8f9fa;
		padding: 20px;
		border-radius: 8px;
		border: 1px solid #dee2e6;
	}
	.instructions ol {
		margin: 0;
		padding-left: 20px;
	}
	.instructions li {
		margin-bottom: 8px;
	}
</style>

<div class="container">
	<h1>Secret Stuff.</h1>
	
	<div class="instructions">
		<p><strong>Instructions:</strong></p>
		<ol>
			<li>Click and drag the "epic cats" button to your bookmarks bar.</li>
			<li>Go to any other website.</li>
			<li>Click the bookmark you just saved!</li>
		</ol>
	</div>

	<a class="bookmarklet" href="{bookmarklet}" title="Drag to bookmarks bar">epic cats</a>
</div>
