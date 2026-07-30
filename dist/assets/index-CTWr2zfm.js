import{M as m,O as hn,B as _e,F as Vt,S as xe,U as dt,V as Q,W as $e,H as et,N as pn,C as Ut,a as $,b as E,A as nt,c as re,d as Rt,e as kn,R as Un,f as Fn,g as Bn,h as Hn,P as zn,i as Gn,j as Ie,E as jn,k as Be,T as He,l as Wt,Q as ft,m as Kn,n as Vn,o as mn,p as gn,q as Wn,r as Pt,s as xn,L as Yn,t as tt,u as wn,v as de,w as we,x as Xn,y as ht,D as Lt,I as Dt,z as pt,G as Qn,J as Ft,K as qn,X as Zn,Y as ie,Z as Jn,_ as bn,$ as $n,a0 as eo,a1 as to,a2 as mt,a3 as It,a4 as no,a5 as oo,a6 as Bt,a7 as At,a8 as yn,a9 as b,aa as at,ab as so,ac as ao,ad as ro,ae as Tn,af as io,ag as rt,ah as X,ai as co,aj as lo,ak as uo,al as fo,am as vn,an as ho,ao as Yt,ap as Xt,aq as Qt,ar as qt,as as Zt,at as po,au as mo,av as ze,aw as go,ax as xt,ay as wt,az as bt,aA as An,aB as xo,aC as wo,aD as Mn,aE as O,aF as ee,aG as ne,aH as _t,aI as Jt,aJ as yt,aK as Tt,aL as ot,aM as st,aN as vt,aO as bo,aP as yo,aQ as To,aR as $t}from"./three-BFwTB58M.js";import{g as P}from"./gsap-SFc2wnMY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const Sn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ke{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const vo=new hn(-1,1,1,-1,0,1);class Ao extends _e{constructor(){super(),this.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Vt([0,2,0,0,2,0],2))}}const Mo=new Ao;class Ht{constructor(t){this._mesh=new m(Mo,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,vo)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class En extends Ke{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof xe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=dt.clone(t.uniforms),this.material=new xe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ht(this.material)}render(t,n,e){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=e.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class en extends Ke{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,e){const o=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,c;this.inverse?(a=0,c=1):(a=1,c=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),s.buffers.stencil.setFunc(o.ALWAYS,a,4294967295),s.buffers.stencil.setClear(c),s.buffers.stencil.setLocked(!0),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(o.EQUAL,1,4294967295),s.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),s.buffers.stencil.setLocked(!0)}}class So extends Ke{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Eo{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const e=t.getSize(new Q);this._width=e.width,this._height=e.height,n=new $e(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:et}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new En(Sn),this.copyPass.material.blending=pn,this.clock=new Ut}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let e=!1;for(let o=0,s=this.passes.length;o<s;o++){const a=this.passes[o];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,e),a.needsSwap){if(e){const c=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),r.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}en!==void 0&&(a instanceof en?e=!0:a instanceof So&&(e=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new Q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const e=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(e,o),this.renderTarget2.setSize(e,o);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(e,o)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Co extends Ke{constructor(t,n,e=null,o=null,s=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=e,this.clearColor=o,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new $}render(t,n,e){const o=t.autoClear;t.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:e),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=o}}const Ro={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new $(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class je extends Ke{constructor(t,n,e,o){super(),this.strength=n!==void 0?n:1,this.radius=e,this.threshold=o,this.resolution=t!==void 0?new Q(t.x,t.y):new Q(256,256),this.clearColor=new $(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new $e(s,a,{type:et}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new $e(s,a,{type:et});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new $e(s,a,{type:et});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),a=Math.round(a/2)}const c=Ro;this.highPassUniforms=dt.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new xe({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const r=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(r[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Q(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const d=Sn;this.copyUniforms=dt.clone(d.uniforms),this.blendMaterial=new xe({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:nt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new $,this.oldClearAlpha=1,this.basic=new re,this.fsQuad=new Ht(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,n){let e=Math.round(t/2),o=Math.round(n/2);this.renderTargetBright.setSize(e,o);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(e,o),this.renderTargetsVertical[s].setSize(e,o),this.separableBlurMaterials[s].uniforms.invSize.value=new Q(1/e,1/o),e=Math.round(e/2),o=Math.round(o/2)}render(t,n,e,o,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=e.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=e.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let c=this.renderTargetBright;for(let r=0;r<this.nMips;r++)this.fsQuad.material=this.separableBlurMaterials[r],this.separableBlurMaterials[r].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[r].uniforms.direction.value=je.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[r]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[r].uniforms.colorTexture.value=this.renderTargetsHorizontal[r].texture,this.separableBlurMaterials[r].uniforms.direction.value=je.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[r]),t.clear(),this.fsQuad.render(t),c=this.renderTargetsVertical[r];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const n=[];for(let e=0;e<t;e++)n.push(.39894*Math.exp(-.5*e*e/(t*t))/t);return new xe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Q(.5,.5)},direction:{value:new Q(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new xe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}je.BlurDirectionX=new Q(1,0);je.BlurDirectionY=new Q(0,1);const Po={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Q(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		precision highp float;

		uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

		//----------------------------------------------------------------------------------
		// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
		// SDK Version: v3.00
		// Email:       gameworks@nvidia.com
		// Site:        http://developer.nvidia.com/
		//
		// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
		//
		// Redistribution and use in source and binary forms, with or without
		// modification, are permitted provided that the following conditions
		// are met:
		//  * Redistributions of source code must retain the above copyright
		//    notice, this list of conditions and the following disclaimer.
		//  * Redistributions in binary form must reproduce the above copyright
		//    notice, this list of conditions and the following disclaimer in the
		//    documentation and/or other materials provided with the distribution.
		//  * Neither the name of NVIDIA CORPORATION nor the names of its
		//    contributors may be used to endorse or promote products derived
		//    from this software without specific prior written permission.
		//
		// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
		// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
		// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
		// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
		// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
		// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
		// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
		// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
		// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		//
		//----------------------------------------------------------------------------------

		#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
		#endif

		/*--------------------------------------------------------------------------*/
		#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
		#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
		/*--------------------------------------------------------------------------*/

		#define NUM_SAMPLES 5

		// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
		float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
		}

		/*============================================================================

									FXAA3 QUALITY - PC

		============================================================================*/

		/*--------------------------------------------------------------------------*/
		vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
		) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
				if(earlyExit) FxaaDiscard;
			#else
				if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
				// locate the edge
				vec2 dirToEdge;
				dirToEdge.x = contrastE > contrastW ? 1. : -1.;
				dirToEdge.y = contrastS > contrastN ? 1. : -1.;
				// . 2 .      . 1 .
				// 1 0 2  ~=  0 0 1
				// . 1 .      . 0 .

				// tap 2 pixels and see which ones are "outside" the edge, to
				// determine if the edge is vertical or horizontal

				vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongH = contrast( rgbaM, rgbaAlongH );
				// . 1 .
				// 0 0 1
				// . 0 H

				vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongV = contrast( rgbaM, rgbaAlongV );
				// V 1 .
				// 0 0 1
				// . 0 .

				relativeVContrast = matchAlongV - matchAlongH;
				relativeVContrast *= fxaaQualityinvEdgeThreshold;

				if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
					// 1 1 .
					// 0 0 1
					// . 0 1

					// do a simple blur
					return mix(
						rgbaM,
						(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
						.4
					);
				}

				horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
				iterationsUsed = i;

				float increment = float(i + 1);

				if(!doneN) {
					nDist += increment;
					posN = posM + offNP * nDist;
					vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
					doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
					iterationsUsedN = i;
				}

				if(!doneP) {
					pDist += increment;
					posP = posM - offNP * pDist;
					vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
					doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
					iterationsUsedP = i;
				}

				if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
				doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
				doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
				rgbaM,
				rgbaN,
				dist * .5
			);
		}

		void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
				vUv,
				tDiffuse,
				resolution,
				edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
				invEdgeDetectionQuality
			);

		}
	`},Lo={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Do extends Ke{constructor(t,n,e){super(),this.scene=t,this.camera=n;const o=e.focus!==void 0?e.focus:1,s=e.aperture!==void 0?e.aperture:.025,a=e.maxblur!==void 0?e.maxblur:1;this.renderTargetDepth=new $e(1,1,{minFilter:Rt,magFilter:Rt,type:et}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new kn,this.materialDepth.depthPacking=Un,this.materialDepth.blending=pn;const c=Lo,r=dt.clone(c.uniforms);r.tDepth.value=this.renderTargetDepth.texture,r.focus.value=o,r.aspect.value=n.aspect,r.aperture.value=s,r.maxblur.value=a,r.nearClip.value=n.near,r.farClip.value=n.far,this.materialBokeh=new xe({defines:Object.assign({},c.defines),uniforms:r,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.uniforms=r,this.fsQuad=new Ht(this.materialBokeh),this._oldClearColor=new $}render(t,n,e){this.scene.overrideMaterial=this.materialDepth,t.getClearColor(this._oldClearColor);const o=t.getClearAlpha(),s=t.autoClear;t.autoClear=!1,t.setClearColor(16777215),t.setClearAlpha(1),t.setRenderTarget(this.renderTargetDepth),t.clear(),t.render(this.scene,this.camera),this.uniforms.tColor.value=e.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),t.clear(),this.fsQuad.render(t)),this.scene.overrideMaterial=null,t.setClearColor(this._oldClearColor),t.setClearAlpha(o),t.autoClear=s}setSize(t,n){this.materialBokeh.uniforms.aspect.value=t/n,this.renderTargetDepth.setSize(t,n)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}function Io(i){const t=new Fn;t.background=new $(0),t.fog=new Bn(0,.04);const n=new Hn({antialias:!1,powerPreference:"high-performance",alpha:!1});n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(window.innerWidth,window.innerHeight),n.shadowMap.enabled=!0,n.shadowMap.type=zn,n.toneMapping=Gn,n.toneMappingExposure=.85,n.outputColorSpace=Ie,i.appendChild(n.domElement);const e=new Ut;return{scene:t,renderer:n,clock:e}}function _o(i,t,n){const e=window.innerWidth,o=window.innerHeight,s=i.getPixelRatio(),a=new Eo(i),c=new Co(t,n);a.addPass(c);const r=new Do(t,n,{focus:11,aperture:1e-4,maxblur:.008,width:e,height:o});a.addPass(r);const l=new je(new Q(e,o),1.4,.5,.25);a.addPass(l);const d=new En(Po);return d.material.uniforms.resolution.value.set(1/(e*s),1/(o*s)),a.addPass(d),window.addEventListener("resize",()=>{const u=window.innerWidth,h=window.innerHeight,p=i.getPixelRatio();i.setSize(u,h),a.setSize(u,h),l.resolution.set(u,h),d.material.uniforms.resolution.value.set(1/(u*p),1/(h*p)),n.aspect=u/h,n.updateProjectionMatrix()}),{composer:a,bloomPass:l,bokehPass:r,fxaaPass:d}}const tn={type:"change"},Mt={type:"start"},nn={type:"end"},ut=new Kn,on=new Vn,No=Math.cos(70*mn.DEG2RAD);class Oo extends jn{constructor(t,n){super(),this.object=t,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Be.ROTATE,MIDDLE:Be.DOLLY,RIGHT:Be.PAN},this.touches={ONE:He.ROTATE,TWO:He.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(f){f.addEventListener("keydown",Le),this._domElementKeyEvents=f},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Le),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(tn),e.update(),s=o.NONE},this.update=function(){const f=new E,A=new ft().setFromUnitVectors(t.up,new E(0,1,0)),U=A.clone().invert(),Y=new E,te=new ft,Ae=new E,se=2*Math.PI;return function(On=null){const jt=e.object.position;f.copy(jt).sub(e.target),f.applyQuaternion(A),c.setFromVector3(f),e.autoRotate&&s===o.NONE&&C(j(On)),e.enableDamping?(c.theta+=r.theta*e.dampingFactor,c.phi+=r.phi*e.dampingFactor):(c.theta+=r.theta,c.phi+=r.phi);let he=e.minAzimuthAngle,pe=e.maxAzimuthAngle;isFinite(he)&&isFinite(pe)&&(he<-Math.PI?he+=se:he>Math.PI&&(he-=se),pe<-Math.PI?pe+=se:pe>Math.PI&&(pe-=se),he<=pe?c.theta=Math.max(he,Math.min(pe,c.theta)):c.theta=c.theta>(he+pe)/2?Math.max(he,c.theta):Math.min(pe,c.theta)),c.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,c.phi)),c.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(d,e.dampingFactor):e.target.add(d),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor);let qe=!1;if(e.zoomToCursor&&S||e.object.isOrthographicCamera)c.radius=I(c.radius);else{const me=c.radius;c.radius=I(c.radius*l),qe=me!=c.radius}if(f.setFromSpherical(c),f.applyQuaternion(U),jt.copy(e.target).add(f),e.object.lookAt(e.target),e.enableDamping===!0?(r.theta*=1-e.dampingFactor,r.phi*=1-e.dampingFactor,d.multiplyScalar(1-e.dampingFactor)):(r.set(0,0,0),d.set(0,0,0)),e.zoomToCursor&&S){let me=null;if(e.object.isPerspectiveCamera){const Ze=f.length();me=I(Ze*l);const lt=Ze-me;e.object.position.addScaledVector(M,lt),e.object.updateMatrixWorld(),qe=!!lt}else if(e.object.isOrthographicCamera){const Ze=new E(B.x,B.y,0);Ze.unproject(e.object);const lt=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/l)),e.object.updateProjectionMatrix(),qe=lt!==e.object.zoom;const Kt=new E(B.x,B.y,0);Kt.unproject(e.object),e.object.position.sub(Kt).add(Ze),e.object.updateMatrixWorld(),me=f.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;me!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(me).add(e.object.position):(ut.origin.copy(e.object.position),ut.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(ut.direction))<No?t.lookAt(e.target):(on.setFromNormalAndCoplanarPoint(e.object.up,e.target),ut.intersectPlane(on,e.target))))}else if(e.object.isOrthographicCamera){const me=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/l)),me!==e.object.zoom&&(e.object.updateProjectionMatrix(),qe=!0)}return l=1,S=!1,qe||Y.distanceToSquared(e.object.position)>a||8*(1-te.dot(e.object.quaternion))>a||Ae.distanceToSquared(e.target)>a?(e.dispatchEvent(tn),Y.copy(e.object.position),te.copy(e.object.quaternion),Ae.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",zt),e.domElement.removeEventListener("pointerdown",Pe),e.domElement.removeEventListener("pointercancel",ve),e.domElement.removeEventListener("wheel",ct),e.domElement.removeEventListener("pointermove",ke),e.domElement.removeEventListener("pointerup",ve),e.domElement.getRootNode().removeEventListener("keydown",Xe,{capture:!0}),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",Le),e._domElementKeyEvents=null)};const e=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=o.NONE;const a=1e-6,c=new Wt,r=new Wt;let l=1;const d=new E,u=new Q,h=new Q,p=new Q,g=new Q,w=new Q,x=new Q,T=new Q,y=new Q,R=new Q,M=new E,B=new Q;let S=!1;const v=[],K={};let L=!1;function j(f){return f!==null?2*Math.PI/60*e.autoRotateSpeed*f:2*Math.PI/60/60*e.autoRotateSpeed}function H(f){const A=Math.abs(f*.01);return Math.pow(.95,e.zoomSpeed*A)}function C(f){r.theta-=f}function N(f){r.phi-=f}const V=function(){const f=new E;return function(U,Y){f.setFromMatrixColumn(Y,0),f.multiplyScalar(-U),d.add(f)}}(),D=function(){const f=new E;return function(U,Y){e.screenSpacePanning===!0?f.setFromMatrixColumn(Y,1):(f.setFromMatrixColumn(Y,0),f.crossVectors(e.object.up,f)),f.multiplyScalar(U),d.add(f)}}(),F=function(){const f=new E;return function(U,Y){const te=e.domElement;if(e.object.isPerspectiveCamera){const Ae=e.object.position;f.copy(Ae).sub(e.target);let se=f.length();se*=Math.tan(e.object.fov/2*Math.PI/180),V(2*U*se/te.clientHeight,e.object.matrix),D(2*Y*se/te.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(V(U*(e.object.right-e.object.left)/e.object.zoom/te.clientWidth,e.object.matrix),D(Y*(e.object.top-e.object.bottom)/e.object.zoom/te.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function Z(f){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?l/=f:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function W(f){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?l*=f:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function q(f,A){if(!e.zoomToCursor)return;S=!0;const U=e.domElement.getBoundingClientRect(),Y=f-U.left,te=A-U.top,Ae=U.width,se=U.height;B.x=Y/Ae*2-1,B.y=-(te/se)*2+1,M.set(B.x,B.y,1).unproject(e.object).sub(e.object.position).normalize()}function I(f){return Math.max(e.minDistance,Math.min(e.maxDistance,f))}function _(f){u.set(f.clientX,f.clientY)}function G(f){q(f.clientX,f.clientX),T.set(f.clientX,f.clientY)}function z(f){g.set(f.clientX,f.clientY)}function oe(f){h.set(f.clientX,f.clientY),p.subVectors(h,u).multiplyScalar(e.rotateSpeed);const A=e.domElement;C(2*Math.PI*p.x/A.clientHeight),N(2*Math.PI*p.y/A.clientHeight),u.copy(h),e.update()}function be(f){y.set(f.clientX,f.clientY),R.subVectors(y,T),R.y>0?Z(H(R.y)):R.y<0&&W(H(R.y)),T.copy(y),e.update()}function ce(f){w.set(f.clientX,f.clientY),x.subVectors(w,g).multiplyScalar(e.panSpeed),F(x.x,x.y),g.copy(w),e.update()}function Ee(f){q(f.clientX,f.clientY),f.deltaY<0?W(H(f.deltaY)):f.deltaY>0&&Z(H(f.deltaY)),e.update()}function Ce(f){let A=!1;switch(f.code){case e.keys.UP:f.ctrlKey||f.metaKey||f.shiftKey?N(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):F(0,e.keyPanSpeed),A=!0;break;case e.keys.BOTTOM:f.ctrlKey||f.metaKey||f.shiftKey?N(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):F(0,-e.keyPanSpeed),A=!0;break;case e.keys.LEFT:f.ctrlKey||f.metaKey||f.shiftKey?C(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):F(e.keyPanSpeed,0),A=!0;break;case e.keys.RIGHT:f.ctrlKey||f.metaKey||f.shiftKey?C(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):F(-e.keyPanSpeed,0),A=!0;break}A&&(f.preventDefault(),e.update())}function ye(f){if(v.length===1)u.set(f.pageX,f.pageY);else{const A=Fe(f),U=.5*(f.pageX+A.x),Y=.5*(f.pageY+A.y);u.set(U,Y)}}function le(f){if(v.length===1)g.set(f.pageX,f.pageY);else{const A=Fe(f),U=.5*(f.pageX+A.x),Y=.5*(f.pageY+A.y);g.set(U,Y)}}function Re(f){const A=Fe(f),U=f.pageX-A.x,Y=f.pageY-A.y,te=Math.sqrt(U*U+Y*Y);T.set(0,te)}function J(f){e.enableZoom&&Re(f),e.enablePan&&le(f)}function Ne(f){e.enableZoom&&Re(f),e.enableRotate&&ye(f)}function Te(f){if(v.length==1)h.set(f.pageX,f.pageY);else{const U=Fe(f),Y=.5*(f.pageX+U.x),te=.5*(f.pageY+U.y);h.set(Y,te)}p.subVectors(h,u).multiplyScalar(e.rotateSpeed);const A=e.domElement;C(2*Math.PI*p.x/A.clientHeight),N(2*Math.PI*p.y/A.clientHeight),u.copy(h)}function fe(f){if(v.length===1)w.set(f.pageX,f.pageY);else{const A=Fe(f),U=.5*(f.pageX+A.x),Y=.5*(f.pageY+A.y);w.set(U,Y)}x.subVectors(w,g).multiplyScalar(e.panSpeed),F(x.x,x.y),g.copy(w)}function ue(f){const A=Fe(f),U=f.pageX-A.x,Y=f.pageY-A.y,te=Math.sqrt(U*U+Y*Y);y.set(0,te),R.set(0,Math.pow(y.y/T.y,e.zoomSpeed)),Z(R.y),T.copy(y);const Ae=(f.pageX+A.x)*.5,se=(f.pageY+A.y)*.5;q(Ae,se)}function it(f){e.enableZoom&&ue(f),e.enablePan&&fe(f)}function Oe(f){e.enableZoom&&ue(f),e.enableRotate&&Te(f)}function Pe(f){e.enabled!==!1&&(v.length===0&&(e.domElement.setPointerCapture(f.pointerId),e.domElement.addEventListener("pointermove",ke),e.domElement.addEventListener("pointerup",ve)),!Nn(f)&&(In(f),f.pointerType==="touch"?Qe(f):Ve(f)))}function ke(f){e.enabled!==!1&&(f.pointerType==="touch"?Dn(f):We(f))}function ve(f){switch(_n(f),v.length){case 0:e.domElement.releasePointerCapture(f.pointerId),e.domElement.removeEventListener("pointermove",ke),e.domElement.removeEventListener("pointerup",ve),e.dispatchEvent(nn),s=o.NONE;break;case 1:const A=v[0],U=K[A];Qe({pointerId:A,pageX:U.x,pageY:U.y});break}}function Ve(f){let A;switch(f.button){case 0:A=e.mouseButtons.LEFT;break;case 1:A=e.mouseButtons.MIDDLE;break;case 2:A=e.mouseButtons.RIGHT;break;default:A=-1}switch(A){case Be.DOLLY:if(e.enableZoom===!1)return;G(f),s=o.DOLLY;break;case Be.ROTATE:if(f.ctrlKey||f.metaKey||f.shiftKey){if(e.enablePan===!1)return;z(f),s=o.PAN}else{if(e.enableRotate===!1)return;_(f),s=o.ROTATE}break;case Be.PAN:if(f.ctrlKey||f.metaKey||f.shiftKey){if(e.enableRotate===!1)return;_(f),s=o.ROTATE}else{if(e.enablePan===!1)return;z(f),s=o.PAN}break;default:s=o.NONE}s!==o.NONE&&e.dispatchEvent(Mt)}function We(f){switch(s){case o.ROTATE:if(e.enableRotate===!1)return;oe(f);break;case o.DOLLY:if(e.enableZoom===!1)return;be(f);break;case o.PAN:if(e.enablePan===!1)return;ce(f);break}}function ct(f){e.enabled===!1||e.enableZoom===!1||s!==o.NONE||(f.preventDefault(),e.dispatchEvent(Mt),Ee(Ye(f)),e.dispatchEvent(nn))}function Ye(f){const A=f.deltaMode,U={clientX:f.clientX,clientY:f.clientY,deltaY:f.deltaY};switch(A){case 1:U.deltaY*=16;break;case 2:U.deltaY*=100;break}return f.ctrlKey&&!L&&(U.deltaY*=10),U}function Xe(f){f.key==="Control"&&(L=!0,e.domElement.getRootNode().addEventListener("keyup",Ue,{passive:!0,capture:!0}))}function Ue(f){f.key==="Control"&&(L=!1,e.domElement.getRootNode().removeEventListener("keyup",Ue,{passive:!0,capture:!0}))}function Le(f){e.enabled===!1||e.enablePan===!1||Ce(f)}function Qe(f){switch(Gt(f),v.length){case 1:switch(e.touches.ONE){case He.ROTATE:if(e.enableRotate===!1)return;ye(f),s=o.TOUCH_ROTATE;break;case He.PAN:if(e.enablePan===!1)return;le(f),s=o.TOUCH_PAN;break;default:s=o.NONE}break;case 2:switch(e.touches.TWO){case He.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;J(f),s=o.TOUCH_DOLLY_PAN;break;case He.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ne(f),s=o.TOUCH_DOLLY_ROTATE;break;default:s=o.NONE}break;default:s=o.NONE}s!==o.NONE&&e.dispatchEvent(Mt)}function Dn(f){switch(Gt(f),s){case o.TOUCH_ROTATE:if(e.enableRotate===!1)return;Te(f),e.update();break;case o.TOUCH_PAN:if(e.enablePan===!1)return;fe(f),e.update();break;case o.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;it(f),e.update();break;case o.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Oe(f),e.update();break;default:s=o.NONE}}function zt(f){e.enabled!==!1&&f.preventDefault()}function In(f){v.push(f.pointerId)}function _n(f){delete K[f.pointerId];for(let A=0;A<v.length;A++)if(v[A]==f.pointerId){v.splice(A,1);return}}function Nn(f){for(let A=0;A<v.length;A++)if(v[A]==f.pointerId)return!0;return!1}function Gt(f){let A=K[f.pointerId];A===void 0&&(A=new Q,K[f.pointerId]=A),A.set(f.pageX,f.pageY)}function Fe(f){const A=f.pointerId===v[0]?v[1]:v[0];return K[A]}e.domElement.addEventListener("contextmenu",zt),e.domElement.addEventListener("pointerdown",Pe),e.domElement.addEventListener("pointercancel",ve),e.domElement.addEventListener("wheel",ct,{passive:!1}),e.domElement.getRootNode().addEventListener("keydown",Xe,{passive:!0,capture:!0}),this.update()}}function ko(i){const t=new gn(55,window.innerWidth/window.innerHeight,.01,200);t.position.set(0,3.5,9),t.lookAt(0,1.5,0);const n=new Oo(t,i.domElement);return n.enabled=!1,n.enableDamping=!0,n.dampingFactor=.06,n.enablePan=!1,n.minDistance=3,n.maxDistance=18,n.maxPolarAngle=Math.PI/2-.02,n.target.set(0,1.5,0),{camera:t,controls:n}}function Uo(i){i.enabled=!0}function sn(i,t){if(t===Wn)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(t===Pt||t===xn){let n=i.getIndex();if(n===null){const a=[],c=i.getAttribute("position");if(c!==void 0){for(let r=0;r<c.count;r++)a.push(r);i.setIndex(a),n=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const e=n.count-2,o=[];if(t===Pt)for(let a=1;a<=e;a++)o.push(n.getX(0)),o.push(n.getX(a)),o.push(n.getX(a+1));else for(let a=0;a<e;a++)a%2===0?(o.push(n.getX(a)),o.push(n.getX(a+1)),o.push(n.getX(a+2))):(o.push(n.getX(a+2)),o.push(n.getX(a+1)),o.push(n.getX(a)));o.length/3!==e&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(o),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),i}class Fo extends Yn{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(n){return new jo(n)}),this.register(function(n){return new Ko(n)}),this.register(function(n){return new $o(n)}),this.register(function(n){return new es(n)}),this.register(function(n){return new ts(n)}),this.register(function(n){return new Wo(n)}),this.register(function(n){return new Yo(n)}),this.register(function(n){return new Xo(n)}),this.register(function(n){return new Qo(n)}),this.register(function(n){return new Go(n)}),this.register(function(n){return new qo(n)}),this.register(function(n){return new Vo(n)}),this.register(function(n){return new Jo(n)}),this.register(function(n){return new Zo(n)}),this.register(function(n){return new Ho(n)}),this.register(function(n){return new ns(n)}),this.register(function(n){return new os(n)})}load(t,n,e,o){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=tt.extractUrlBase(t);a=tt.resolveURL(l,this.path)}else a=tt.extractUrlBase(t);this.manager.itemStart(t);const c=function(l){o?o(l):console.error(l),s.manager.itemError(t),s.manager.itemEnd(t)},r=new wn(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(t,function(l){try{s.parse(l,a,function(d){n(d),s.manager.itemEnd(t)},c)}catch(d){c(d)}},e,c)}setDRACOLoader(t){return this.dracoLoader=t,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,n,e,o){let s;const a={},c={},r=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(r.decode(new Uint8Array(t,0,4))===Cn){try{a[k.KHR_BINARY_GLTF]=new ss(t)}catch(u){o&&o(u);return}s=JSON.parse(a[k.KHR_BINARY_GLTF].content)}else s=JSON.parse(r.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){o&&o(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new xs(s,{path:n||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let d=0;d<s.extensionsUsed.length;++d){const u=s.extensionsUsed[d],h=s.extensionsRequired||[];switch(u){case k.KHR_MATERIALS_UNLIT:a[u]=new zo;break;case k.KHR_DRACO_MESH_COMPRESSION:a[u]=new as(s,this.dracoLoader);break;case k.KHR_TEXTURE_TRANSFORM:a[u]=new rs;break;case k.KHR_MESH_QUANTIZATION:a[u]=new is;break;default:h.indexOf(u)>=0&&c[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(c),l.parse(e,o)}parseAsync(t,n){const e=this;return new Promise(function(o,s){e.parse(t,n,o,s)})}}function Bo(){let i={};return{get:function(t){return i[t]},add:function(t,n){i[t]=n},remove:function(t){delete i[t]},removeAll:function(){i={}}}}const k={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ho{constructor(t){this.parser=t,this.name=k.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,n=this.parser.json.nodes||[];for(let e=0,o=n.length;e<o;e++){const s=n[e];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const n=this.parser,e="light:"+t;let o=n.cache.get(e);if(o)return o;const s=n.json,r=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let l;const d=new $(16777215);r.color!==void 0&&d.setRGB(r.color[0],r.color[1],r.color[2],we);const u=r.range!==void 0?r.range:0;switch(r.type){case"directional":l=new Lt(d),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ht(d),l.distance=u;break;case"spot":l=new Xn(d),l.distance=u,r.spot=r.spot||{},r.spot.innerConeAngle=r.spot.innerConeAngle!==void 0?r.spot.innerConeAngle:0,r.spot.outerConeAngle=r.spot.outerConeAngle!==void 0?r.spot.outerConeAngle:Math.PI/4,l.angle=r.spot.outerConeAngle,l.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+r.type)}return l.position.set(0,0,0),l.decay=2,ge(l,r),r.intensity!==void 0&&(l.intensity=r.intensity),l.name=n.createUniqueName(r.name||"light_"+t),o=Promise.resolve(l),n.cache.add(e,o),o}getDependency(t,n){if(t==="light")return this._loadLight(n)}createNodeAttachment(t){const n=this,e=this.parser,s=e.json.nodes[t],c=(s.extensions&&s.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(r){return e._getNodeRef(n.cache,c,r)})}}class zo{constructor(){this.name=k.KHR_MATERIALS_UNLIT}getMaterialType(){return re}extendParams(t,n,e){const o=[];t.color=new $(1,1,1),t.opacity=1;const s=n.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],we),t.opacity=a[3]}s.baseColorTexture!==void 0&&o.push(e.assignTexture(t,"map",s.baseColorTexture,Ie))}return Promise.all(o)}}class Go{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,n){const o=this.parser.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=o.extensions[this.name].emissiveStrength;return s!==void 0&&(n.emissiveIntensity=s),Promise.resolve()}}class jo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];if(a.clearcoatFactor!==void 0&&(n.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(e.assignTexture(n,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(n.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(e.assignTexture(n,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(e.assignTexture(n,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const c=a.clearcoatNormalTexture.scale;n.clearcoatNormalScale=new Q(c,c)}return Promise.all(s)}}class Ko{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_DISPERSION}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const o=this.parser.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=o.extensions[this.name];return n.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Vo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];return a.iridescenceFactor!==void 0&&(n.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(e.assignTexture(n,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(n.iridescenceIOR=a.iridescenceIor),n.iridescenceThicknessRange===void 0&&(n.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(e.assignTexture(n,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class Wo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_SHEEN}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[];n.sheenColor=new $(0,0,0),n.sheenRoughness=0,n.sheen=1;const a=o.extensions[this.name];if(a.sheenColorFactor!==void 0){const c=a.sheenColorFactor;n.sheenColor.setRGB(c[0],c[1],c[2],we)}return a.sheenRoughnessFactor!==void 0&&(n.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(e.assignTexture(n,"sheenColorMap",a.sheenColorTexture,Ie)),a.sheenRoughnessTexture!==void 0&&s.push(e.assignTexture(n,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class Yo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];return a.transmissionFactor!==void 0&&(n.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(e.assignTexture(n,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class Xo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_VOLUME}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];n.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(e.assignTexture(n,"thicknessMap",a.thicknessTexture)),n.attenuationDistance=a.attenuationDistance||1/0;const c=a.attenuationColor||[1,1,1];return n.attenuationColor=new $().setRGB(c[0],c[1],c[2],we),Promise.all(s)}}class Qo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_IOR}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const o=this.parser.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=o.extensions[this.name];return n.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class qo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_SPECULAR}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];n.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(e.assignTexture(n,"specularIntensityMap",a.specularTexture));const c=a.specularColorFactor||[1,1,1];return n.specularColor=new $().setRGB(c[0],c[1],c[2],we),a.specularColorTexture!==void 0&&s.push(e.assignTexture(n,"specularColorMap",a.specularColorTexture,Ie)),Promise.all(s)}}class Zo{constructor(t){this.parser=t,this.name=k.EXT_MATERIALS_BUMP}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];return n.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(e.assignTexture(n,"bumpMap",a.bumpTexture)),Promise.all(s)}}class Jo{constructor(t){this.parser=t,this.name=k.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:de}extendMaterialParams(t,n){const e=this.parser,o=e.json.materials[t];if(!o.extensions||!o.extensions[this.name])return Promise.resolve();const s=[],a=o.extensions[this.name];return a.anisotropyStrength!==void 0&&(n.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(n.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(e.assignTexture(n,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class $o{constructor(t){this.parser=t,this.name=k.KHR_TEXTURE_BASISU}loadTexture(t){const n=this.parser,e=n.json,o=e.textures[t];if(!o.extensions||!o.extensions[this.name])return null;const s=o.extensions[this.name],a=n.options.ktx2Loader;if(!a){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return n.loadTextureImage(t,s.source,a)}}class es{constructor(t){this.parser=t,this.name=k.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const n=this.name,e=this.parser,o=e.json,s=o.textures[t];if(!s.extensions||!s.extensions[n])return null;const a=s.extensions[n],c=o.images[a.source];let r=e.textureLoader;if(c.uri){const l=e.options.manager.getHandler(c.uri);l!==null&&(r=l)}return this.detectSupport().then(function(l){if(l)return e.loadTextureImage(t,a.source,r);if(o.extensionsRequired&&o.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return e.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const n=new Image;n.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",n.onload=n.onerror=function(){t(n.height===1)}})),this.isSupported}}class ts{constructor(t){this.parser=t,this.name=k.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const n=this.name,e=this.parser,o=e.json,s=o.textures[t];if(!s.extensions||!s.extensions[n])return null;const a=s.extensions[n],c=o.images[a.source];let r=e.textureLoader;if(c.uri){const l=e.options.manager.getHandler(c.uri);l!==null&&(r=l)}return this.detectSupport().then(function(l){if(l)return e.loadTextureImage(t,a.source,r);if(o.extensionsRequired&&o.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return e.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const n=new Image;n.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",n.onload=n.onerror=function(){t(n.height===1)}})),this.isSupported}}class ns{constructor(t){this.name=k.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const n=this.parser.json,e=n.bufferViews[t];if(e.extensions&&e.extensions[this.name]){const o=e.extensions[this.name],s=this.parser.getDependency("buffer",o.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(c){const r=o.byteOffset||0,l=o.byteLength||0,d=o.count,u=o.byteStride,h=new Uint8Array(c,r,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,h,o.mode,o.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(p),d,u,h,o.mode,o.filter),p})})}else return null}}class os{constructor(t){this.name=k.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const n=this.parser.json,e=n.nodes[t];if(!e.extensions||!e.extensions[this.name]||e.mesh===void 0)return null;const o=n.meshes[e.mesh];for(const l of o.primitives)if(l.mode!==ae.TRIANGLES&&l.mode!==ae.TRIANGLE_STRIP&&l.mode!==ae.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=e.extensions[this.name].attributes,c=[],r={};for(const l in a)c.push(this.parser.getDependency("accessor",a[l]).then(d=>(r[l]=d,r[l])));return c.length<1?null:(c.push(this.parser.createNodeMesh(t)),Promise.all(c).then(l=>{const d=l.pop(),u=d.isGroup?d.children:[d],h=l[0].count,p=[];for(const g of u){const w=new pt,x=new E,T=new ft,y=new E(1,1,1),R=new Dt(g.geometry,g.material,h);for(let M=0;M<h;M++)r.TRANSLATION&&x.fromBufferAttribute(r.TRANSLATION,M),r.ROTATION&&T.fromBufferAttribute(r.ROTATION,M),r.SCALE&&y.fromBufferAttribute(r.SCALE,M),R.setMatrixAt(M,w.compose(x,T,y));for(const M in r)if(M==="_COLOR_0"){const B=r[M];R.instanceColor=new Qn(B.array,B.itemSize,B.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,r[M]);Ft.prototype.copy.call(R,g),this.parser.assignFinalMaterial(R),p.push(R)}return d.isGroup?(d.clear(),d.add(...p),d):p[0]}))}}const Cn="glTF",Je=12,an={JSON:1313821514,BIN:5130562};class ss{constructor(t){this.name=k.KHR_BINARY_GLTF,this.content=null,this.body=null;const n=new DataView(t,0,Je),e=new TextDecoder;if(this.header={magic:e.decode(new Uint8Array(t.slice(0,4))),version:n.getUint32(4,!0),length:n.getUint32(8,!0)},this.header.magic!==Cn)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const o=this.header.length-Je,s=new DataView(t,Je);let a=0;for(;a<o;){const c=s.getUint32(a,!0);a+=4;const r=s.getUint32(a,!0);if(a+=4,r===an.JSON){const l=new Uint8Array(t,Je+a,c);this.content=e.decode(l)}else if(r===an.BIN){const l=Je+a;this.body=t.slice(l,l+c)}a+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class as{constructor(t,n){if(!n)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=k.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=n,this.dracoLoader.preload()}decodePrimitive(t,n){const e=this.json,o=this.dracoLoader,s=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,c={},r={},l={};for(const d in a){const u=Nt[d]||d.toLowerCase();c[u]=a[d]}for(const d in t.attributes){const u=Nt[d]||d.toLowerCase();if(a[d]!==void 0){const h=e.accessors[t.attributes[d]],p=Ge[h.componentType];l[u]=p.name,r[u]=h.normalized===!0}}return n.getDependency("bufferView",s).then(function(d){return new Promise(function(u,h){o.decodeDracoFile(d,function(p){for(const g in p.attributes){const w=p.attributes[g],x=r[g];x!==void 0&&(w.normalized=x)}u(p)},c,l,we,h)})})}}class rs{constructor(){this.name=k.KHR_TEXTURE_TRANSFORM}extendTexture(t,n){return(n.texCoord===void 0||n.texCoord===t.channel)&&n.offset===void 0&&n.rotation===void 0&&n.scale===void 0||(t=t.clone(),n.texCoord!==void 0&&(t.channel=n.texCoord),n.offset!==void 0&&t.offset.fromArray(n.offset),n.rotation!==void 0&&(t.rotation=n.rotation),n.scale!==void 0&&t.repeat.fromArray(n.scale),t.needsUpdate=!0),t}}class is{constructor(){this.name=k.KHR_MESH_QUANTIZATION}}class Rn extends mo{constructor(t,n,e,o){super(t,n,e,o)}copySampleValue_(t){const n=this.resultBuffer,e=this.sampleValues,o=this.valueSize,s=t*o*3+o;for(let a=0;a!==o;a++)n[a]=e[s+a];return n}interpolate_(t,n,e,o){const s=this.resultBuffer,a=this.sampleValues,c=this.valueSize,r=c*2,l=c*3,d=o-n,u=(e-n)/d,h=u*u,p=h*u,g=t*l,w=g-l,x=-2*p+3*h,T=p-h,y=1-x,R=T-h+u;for(let M=0;M!==c;M++){const B=a[w+M+c],S=a[w+M+r]*d,v=a[g+M+c],K=a[g+M]*d;s[M]=y*B+R*S+x*v+T*K}return s}}const cs=new ft;class ls extends Rn{interpolate_(t,n,e,o){const s=super.interpolate_(t,n,e,o);return cs.fromArray(s).normalize().toArray(s),s}}const ae={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ge={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},rn={9728:Rt,9729:mt,9984:to,9985:eo,9986:$n,9987:bn},cn={33071:oo,33648:no,10497:It},St={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Nt={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Me={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},us={CUBICSPLINE:void 0,LINEAR:vn,STEP:fo},Et={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ds(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new b({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:po})),i.DefaultMaterial}function De(i,t,n){for(const e in n.extensions)i[e]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[e]=n.extensions[e])}function ge(i,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(i.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function fs(i,t,n){let e=!1,o=!1,s=!1;for(let l=0,d=t.length;l<d;l++){const u=t[l];if(u.POSITION!==void 0&&(e=!0),u.NORMAL!==void 0&&(o=!0),u.COLOR_0!==void 0&&(s=!0),e&&o&&s)break}if(!e&&!o&&!s)return Promise.resolve(i);const a=[],c=[],r=[];for(let l=0,d=t.length;l<d;l++){const u=t[l];if(e){const h=u.POSITION!==void 0?n.getDependency("accessor",u.POSITION):i.attributes.position;a.push(h)}if(o){const h=u.NORMAL!==void 0?n.getDependency("accessor",u.NORMAL):i.attributes.normal;c.push(h)}if(s){const h=u.COLOR_0!==void 0?n.getDependency("accessor",u.COLOR_0):i.attributes.color;r.push(h)}}return Promise.all([Promise.all(a),Promise.all(c),Promise.all(r)]).then(function(l){const d=l[0],u=l[1],h=l[2];return e&&(i.morphAttributes.position=d),o&&(i.morphAttributes.normal=u),s&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function hs(i,t){if(i.updateMorphTargets(),t.weights!==void 0)for(let n=0,e=t.weights.length;n<e;n++)i.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){const n=t.extras.targetNames;if(i.morphTargetInfluences.length===n.length){i.morphTargetDictionary={};for(let e=0,o=n.length;e<o;e++)i.morphTargetDictionary[n[e]]=e}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ps(i){let t;const n=i.extensions&&i.extensions[k.KHR_DRACO_MESH_COMPRESSION];if(n?t="draco:"+n.bufferView+":"+n.indices+":"+Ct(n.attributes):t=i.indices+":"+Ct(i.attributes)+":"+i.mode,i.targets!==void 0)for(let e=0,o=i.targets.length;e<o;e++)t+=":"+Ct(i.targets[e]);return t}function Ct(i){let t="";const n=Object.keys(i).sort();for(let e=0,o=n.length;e<o;e++)t+=n[e]+":"+i[n[e]]+";";return t}function Ot(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ms(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const gs=new pt;class xs{constructor(t={},n={}){this.json=t,this.extensions={},this.plugins={},this.options=n,this.cache=new Bo,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let e=!1,o=!1,s=-1;typeof navigator<"u"&&(e=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,o=navigator.userAgent.indexOf("Firefox")>-1,s=o?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||e||o&&s<98?this.textureLoader=new qn(this.options.manager):this.textureLoader=new Zn(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new wn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,n){const e=this,o=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([e.getDependencies("scene"),e.getDependencies("animation"),e.getDependencies("camera")])}).then(function(a){const c={scene:a[0][o.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:o.asset,parser:e,userData:{}};return De(s,c,o),ge(c,o),Promise.all(e._invokeAll(function(r){return r.afterRoot&&r.afterRoot(c)})).then(function(){for(const r of c.scenes)r.updateMatrixWorld();t(c)})}).catch(n)}_markDefs(){const t=this.json.nodes||[],n=this.json.skins||[],e=this.json.meshes||[];for(let o=0,s=n.length;o<s;o++){const a=n[o].joints;for(let c=0,r=a.length;c<r;c++)t[a[c]].isBone=!0}for(let o=0,s=t.length;o<s;o++){const a=t[o];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(e[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,n){n!==void 0&&(t.refs[n]===void 0&&(t.refs[n]=t.uses[n]=0),t.refs[n]++)}_getNodeRef(t,n,e){if(t.refs[n]<=1)return e;const o=e.clone(),s=(a,c)=>{const r=this.associations.get(a);r!=null&&this.associations.set(c,r);for(const[l,d]of a.children.entries())s(d,c.children[l])};return s(e,o),o.name+="_instance_"+t.uses[n]++,o}_invokeOne(t){const n=Object.values(this.plugins);n.push(this);for(let e=0;e<n.length;e++){const o=t(n[e]);if(o)return o}return null}_invokeAll(t){const n=Object.values(this.plugins);n.unshift(this);const e=[];for(let o=0;o<n.length;o++){const s=t(n[o]);s&&e.push(s)}return e}getDependency(t,n){const e=t+":"+n;let o=this.cache.get(e);if(!o){switch(t){case"scene":o=this.loadScene(n);break;case"node":o=this._invokeOne(function(s){return s.loadNode&&s.loadNode(n)});break;case"mesh":o=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(n)});break;case"accessor":o=this.loadAccessor(n);break;case"bufferView":o=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(n)});break;case"buffer":o=this.loadBuffer(n);break;case"material":o=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(n)});break;case"texture":o=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(n)});break;case"skin":o=this.loadSkin(n);break;case"animation":o=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(n)});break;case"camera":o=this.loadCamera(n);break;default:if(o=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,n)}),!o)throw new Error("Unknown type: "+t);break}this.cache.add(e,o)}return o}getDependencies(t){let n=this.cache.get(t);if(!n){const e=this,o=this.json[t+(t==="mesh"?"es":"s")]||[];n=Promise.all(o.map(function(s,a){return e.getDependency(t,a)})),this.cache.add(t,n)}return n}loadBuffer(t){const n=this.json.buffers[t],e=this.fileLoader;if(n.type&&n.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+n.type+" buffer type is not supported.");if(n.uri===void 0&&t===0)return Promise.resolve(this.extensions[k.KHR_BINARY_GLTF].body);const o=this.options;return new Promise(function(s,a){e.load(tt.resolveURL(n.uri,o.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+n.uri+'".'))})})}loadBufferView(t){const n=this.json.bufferViews[t];return this.getDependency("buffer",n.buffer).then(function(e){const o=n.byteLength||0,s=n.byteOffset||0;return e.slice(s,s+o)})}loadAccessor(t){const n=this,e=this.json,o=this.json.accessors[t];if(o.bufferView===void 0&&o.sparse===void 0){const a=St[o.type],c=Ge[o.componentType],r=o.normalized===!0,l=new c(o.count*a);return Promise.resolve(new ie(l,a,r))}const s=[];return o.bufferView!==void 0?s.push(this.getDependency("bufferView",o.bufferView)):s.push(null),o.sparse!==void 0&&(s.push(this.getDependency("bufferView",o.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",o.sparse.values.bufferView))),Promise.all(s).then(function(a){const c=a[0],r=St[o.type],l=Ge[o.componentType],d=l.BYTES_PER_ELEMENT,u=d*r,h=o.byteOffset||0,p=o.bufferView!==void 0?e.bufferViews[o.bufferView].byteStride:void 0,g=o.normalized===!0;let w,x;if(p&&p!==u){const T=Math.floor(h/p),y="InterleavedBuffer:"+o.bufferView+":"+o.componentType+":"+T+":"+o.count;let R=n.cache.get(y);R||(w=new l(c,T*p,o.count*p/d),R=new Jn(w,p/d),n.cache.add(y,R)),x=new ho(R,r,h%p/d,g)}else c===null?w=new l(o.count*r):w=new l(c,h,o.count*r),x=new ie(w,r,g);if(o.sparse!==void 0){const T=St.SCALAR,y=Ge[o.sparse.indices.componentType],R=o.sparse.indices.byteOffset||0,M=o.sparse.values.byteOffset||0,B=new y(a[1],R,o.sparse.count*T),S=new l(a[2],M,o.sparse.count*r);c!==null&&(x=new ie(x.array.slice(),x.itemSize,x.normalized));for(let v=0,K=B.length;v<K;v++){const L=B[v];if(x.setX(L,S[v*r]),r>=2&&x.setY(L,S[v*r+1]),r>=3&&x.setZ(L,S[v*r+2]),r>=4&&x.setW(L,S[v*r+3]),r>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return x})}loadTexture(t){const n=this.json,e=this.options,s=n.textures[t].source,a=n.images[s];let c=this.textureLoader;if(a.uri){const r=e.manager.getHandler(a.uri);r!==null&&(c=r)}return this.loadTextureImage(t,s,c)}loadTextureImage(t,n,e){const o=this,s=this.json,a=s.textures[t],c=s.images[n],r=(c.uri||c.bufferView)+":"+a.sampler;if(this.textureCache[r])return this.textureCache[r];const l=this.loadImageSource(n,e).then(function(d){d.flipY=!1,d.name=a.name||c.name||"",d.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(d.name=c.uri);const h=(s.samplers||{})[a.sampler]||{};return d.magFilter=rn[h.magFilter]||mt,d.minFilter=rn[h.minFilter]||bn,d.wrapS=cn[h.wrapS]||It,d.wrapT=cn[h.wrapT]||It,o.associations.set(d,{textures:t}),d}).catch(function(){return null});return this.textureCache[r]=l,l}loadImageSource(t,n){const e=this,o=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const a=o.images[t],c=self.URL||self.webkitURL;let r=a.uri||"",l=!1;if(a.bufferView!==void 0)r=e.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const h=new Blob([u],{type:a.mimeType});return r=c.createObjectURL(h),r});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const d=Promise.resolve(r).then(function(u){return new Promise(function(h,p){let g=h;n.isImageBitmapLoader===!0&&(g=function(w){const x=new Yt(w);x.needsUpdate=!0,h(x)}),n.load(tt.resolveURL(u,s.path),g,void 0,p)})}).then(function(u){return l===!0&&c.revokeObjectURL(r),ge(u,a),u.userData.mimeType=a.mimeType||ms(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",r),u});return this.sourceCache[t]=d,d}assignTexture(t,n,e,o){const s=this;return this.getDependency("texture",e.index).then(function(a){if(!a)return null;if(e.texCoord!==void 0&&e.texCoord>0&&(a=a.clone(),a.channel=e.texCoord),s.extensions[k.KHR_TEXTURE_TRANSFORM]){const c=e.extensions!==void 0?e.extensions[k.KHR_TEXTURE_TRANSFORM]:void 0;if(c){const r=s.associations.get(a);a=s.extensions[k.KHR_TEXTURE_TRANSFORM].extendTexture(a,c),s.associations.set(a,r)}}return o!==void 0&&(a.colorSpace=o),t[n]=a,a})}assignFinalMaterial(t){const n=t.geometry;let e=t.material;const o=n.attributes.tangent===void 0,s=n.attributes.color!==void 0,a=n.attributes.normal===void 0;if(t.isPoints){const c="PointsMaterial:"+e.uuid;let r=this.cache.get(c);r||(r=new Bt,At.prototype.copy.call(r,e),r.color.copy(e.color),r.map=e.map,r.sizeAttenuation=!1,this.cache.add(c,r)),e=r}else if(t.isLine){const c="LineBasicMaterial:"+e.uuid;let r=this.cache.get(c);r||(r=new yn,At.prototype.copy.call(r,e),r.color.copy(e.color),r.map=e.map,this.cache.add(c,r)),e=r}if(o||s||a){let c="ClonedMaterial:"+e.uuid+":";o&&(c+="derivative-tangents:"),s&&(c+="vertex-colors:"),a&&(c+="flat-shading:");let r=this.cache.get(c);r||(r=e.clone(),s&&(r.vertexColors=!0),a&&(r.flatShading=!0),o&&(r.normalScale&&(r.normalScale.y*=-1),r.clearcoatNormalScale&&(r.clearcoatNormalScale.y*=-1)),this.cache.add(c,r),this.associations.set(r,this.associations.get(e))),e=r}t.material=e}getMaterialType(){return b}loadMaterial(t){const n=this,e=this.json,o=this.extensions,s=e.materials[t];let a;const c={},r=s.extensions||{},l=[];if(r[k.KHR_MATERIALS_UNLIT]){const u=o[k.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(c,s,n))}else{const u=s.pbrMetallicRoughness||{};if(c.color=new $(1,1,1),c.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;c.color.setRGB(h[0],h[1],h[2],we),c.opacity=h[3]}u.baseColorTexture!==void 0&&l.push(n.assignTexture(c,"map",u.baseColorTexture,Ie)),c.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,c.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(n.assignTexture(c,"metalnessMap",u.metallicRoughnessTexture)),l.push(n.assignTexture(c,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(t,c)})))}s.doubleSided===!0&&(c.side=at);const d=s.alphaMode||Et.OPAQUE;if(d===Et.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,d===Et.MASK&&(c.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==re&&(l.push(n.assignTexture(c,"normalMap",s.normalTexture)),c.normalScale=new Q(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;c.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==re&&(l.push(n.assignTexture(c,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==re){const u=s.emissiveFactor;c.emissive=new $().setRGB(u[0],u[1],u[2],we)}return s.emissiveTexture!==void 0&&a!==re&&l.push(n.assignTexture(c,"emissiveMap",s.emissiveTexture,Ie)),Promise.all(l).then(function(){const u=new a(c);return s.name&&(u.name=s.name),ge(u,s),n.associations.set(u,{materials:t}),s.extensions&&De(o,u,s),u})}createUniqueName(t){const n=so.sanitizeNodeName(t||"");return n in this.nodeNamesUsed?n+"_"+ ++this.nodeNamesUsed[n]:(this.nodeNamesUsed[n]=0,n)}loadGeometries(t){const n=this,e=this.extensions,o=this.primitiveCache;function s(c){return e[k.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,n).then(function(r){return ln(r,c,n)})}const a=[];for(let c=0,r=t.length;c<r;c++){const l=t[c],d=ps(l),u=o[d];if(u)a.push(u.promise);else{let h;l.extensions&&l.extensions[k.KHR_DRACO_MESH_COMPRESSION]?h=s(l):h=ln(new _e,l,n),o[d]={primitive:l,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(t){const n=this,e=this.json,o=this.extensions,s=e.meshes[t],a=s.primitives,c=[];for(let r=0,l=a.length;r<l;r++){const d=a[r].material===void 0?ds(this.cache):this.getDependency("material",a[r].material);c.push(d)}return c.push(n.loadGeometries(a)),Promise.all(c).then(function(r){const l=r.slice(0,r.length-1),d=r[r.length-1],u=[];for(let p=0,g=d.length;p<g;p++){const w=d[p],x=a[p];let T;const y=l[p];if(x.mode===ae.TRIANGLES||x.mode===ae.TRIANGLE_STRIP||x.mode===ae.TRIANGLE_FAN||x.mode===void 0)T=s.isSkinnedMesh===!0?new ao(w,y):new m(w,y),T.isSkinnedMesh===!0&&T.normalizeSkinWeights(),x.mode===ae.TRIANGLE_STRIP?T.geometry=sn(T.geometry,xn):x.mode===ae.TRIANGLE_FAN&&(T.geometry=sn(T.geometry,Pt));else if(x.mode===ae.LINES)T=new ro(w,y);else if(x.mode===ae.LINE_STRIP)T=new Tn(w,y);else if(x.mode===ae.LINE_LOOP)T=new io(w,y);else if(x.mode===ae.POINTS)T=new rt(w,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+x.mode);Object.keys(T.geometry.morphAttributes).length>0&&hs(T,s),T.name=n.createUniqueName(s.name||"mesh_"+t),ge(T,s),x.extensions&&De(o,T,x),n.assignFinalMaterial(T),u.push(T)}for(let p=0,g=u.length;p<g;p++)n.associations.set(u[p],{meshes:t,primitives:p});if(u.length===1)return s.extensions&&De(o,u[0],s),u[0];const h=new X;s.extensions&&De(o,h,s),n.associations.set(h,{meshes:t});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}loadCamera(t){let n;const e=this.json.cameras[t],o=e[e.type];if(!o){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return e.type==="perspective"?n=new gn(mn.radToDeg(o.yfov),o.aspectRatio||1,o.znear||1,o.zfar||2e6):e.type==="orthographic"&&(n=new hn(-o.xmag,o.xmag,o.ymag,-o.ymag,o.znear,o.zfar)),e.name&&(n.name=this.createUniqueName(e.name)),ge(n,e),Promise.resolve(n)}loadSkin(t){const n=this.json.skins[t],e=[];for(let o=0,s=n.joints.length;o<s;o++)e.push(this._loadNodeShallow(n.joints[o]));return n.inverseBindMatrices!==void 0?e.push(this.getDependency("accessor",n.inverseBindMatrices)):e.push(null),Promise.all(e).then(function(o){const s=o.pop(),a=o,c=[],r=[];for(let l=0,d=a.length;l<d;l++){const u=a[l];if(u){c.push(u);const h=new pt;s!==null&&h.fromArray(s.array,l*16),r.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',n.joints[l])}return new co(c,r)})}loadAnimation(t){const n=this.json,e=this,o=n.animations[t],s=o.name?o.name:"animation_"+t,a=[],c=[],r=[],l=[],d=[];for(let u=0,h=o.channels.length;u<h;u++){const p=o.channels[u],g=o.samplers[p.sampler],w=p.target,x=w.node,T=o.parameters!==void 0?o.parameters[g.input]:g.input,y=o.parameters!==void 0?o.parameters[g.output]:g.output;w.node!==void 0&&(a.push(this.getDependency("node",x)),c.push(this.getDependency("accessor",T)),r.push(this.getDependency("accessor",y)),l.push(g),d.push(w))}return Promise.all([Promise.all(a),Promise.all(c),Promise.all(r),Promise.all(l),Promise.all(d)]).then(function(u){const h=u[0],p=u[1],g=u[2],w=u[3],x=u[4],T=[];for(let y=0,R=h.length;y<R;y++){const M=h[y],B=p[y],S=g[y],v=w[y],K=x[y];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const L=e._createAnimationTracks(M,B,S,v,K);if(L)for(let j=0;j<L.length;j++)T.push(L[j])}return new lo(s,void 0,T)})}createNodeMesh(t){const n=this.json,e=this,o=n.nodes[t];return o.mesh===void 0?null:e.getDependency("mesh",o.mesh).then(function(s){const a=e._getNodeRef(e.meshCache,o.mesh,s);return o.weights!==void 0&&a.traverse(function(c){if(c.isMesh)for(let r=0,l=o.weights.length;r<l;r++)c.morphTargetInfluences[r]=o.weights[r]}),a})}loadNode(t){const n=this.json,e=this,o=n.nodes[t],s=e._loadNodeShallow(t),a=[],c=o.children||[];for(let l=0,d=c.length;l<d;l++)a.push(e.getDependency("node",c[l]));const r=o.skin===void 0?Promise.resolve(null):e.getDependency("skin",o.skin);return Promise.all([s,Promise.all(a),r]).then(function(l){const d=l[0],u=l[1],h=l[2];h!==null&&d.traverse(function(p){p.isSkinnedMesh&&p.bind(h,gs)});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}_loadNodeShallow(t){const n=this.json,e=this.extensions,o=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=n.nodes[t],a=s.name?o.createUniqueName(s.name):"",c=[],r=o._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return r&&c.push(r),s.camera!==void 0&&c.push(o.getDependency("camera",s.camera).then(function(l){return o._getNodeRef(o.cameraCache,s.camera,l)})),o._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){c.push(l)}),this.nodeCache[t]=Promise.all(c).then(function(l){let d;if(s.isBone===!0?d=new uo:l.length>1?d=new X:l.length===1?d=l[0]:d=new Ft,d!==l[0])for(let u=0,h=l.length;u<h;u++)d.add(l[u]);if(s.name&&(d.userData.name=s.name,d.name=a),ge(d,s),s.extensions&&De(e,d,s),s.matrix!==void 0){const u=new pt;u.fromArray(s.matrix),d.applyMatrix4(u)}else s.translation!==void 0&&d.position.fromArray(s.translation),s.rotation!==void 0&&d.quaternion.fromArray(s.rotation),s.scale!==void 0&&d.scale.fromArray(s.scale);return o.associations.has(d)||o.associations.set(d,{}),o.associations.get(d).nodes=t,d}),this.nodeCache[t]}loadScene(t){const n=this.extensions,e=this.json.scenes[t],o=this,s=new X;e.name&&(s.name=o.createUniqueName(e.name)),ge(s,e),e.extensions&&De(n,s,e);const a=e.nodes||[],c=[];for(let r=0,l=a.length;r<l;r++)c.push(o.getDependency("node",a[r]));return Promise.all(c).then(function(r){for(let d=0,u=r.length;d<u;d++)s.add(r[d]);const l=d=>{const u=new Map;for(const[h,p]of o.associations)(h instanceof At||h instanceof Yt)&&u.set(h,p);return d.traverse(h=>{const p=o.associations.get(h);p!=null&&u.set(h,p)}),u};return o.associations=l(s),s})}_createAnimationTracks(t,n,e,o,s){const a=[],c=t.name?t.name:t.uuid,r=[];Me[s.path]===Me.weights?t.traverse(function(h){h.morphTargetInfluences&&r.push(h.name?h.name:h.uuid)}):r.push(c);let l;switch(Me[s.path]){case Me.weights:l=Qt;break;case Me.rotation:l=qt;break;case Me.position:case Me.scale:l=Xt;break;default:switch(e.itemSize){case 1:l=Qt;break;case 2:case 3:default:l=Xt;break}break}const d=o.interpolation!==void 0?us[o.interpolation]:vn,u=this._getArrayFromAccessor(e);for(let h=0,p=r.length;h<p;h++){const g=new l(r[h]+"."+Me[s.path],n.array,u,d);o.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(t){let n=t.array;if(t.normalized){const e=Ot(n.constructor),o=new Float32Array(n.length);for(let s=0,a=n.length;s<a;s++)o[s]=n[s]*e;n=o}return n}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(e){const o=this instanceof qt?ls:Rn;return new o(this.times,this.values,this.getValueSize()/3,e)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ws(i,t,n){const e=t.attributes,o=new ze;if(e.POSITION!==void 0){const c=n.json.accessors[e.POSITION],r=c.min,l=c.max;if(r!==void 0&&l!==void 0){if(o.set(new E(r[0],r[1],r[2]),new E(l[0],l[1],l[2])),c.normalized){const d=Ot(Ge[c.componentType]);o.min.multiplyScalar(d),o.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const c=new E,r=new E;for(let l=0,d=s.length;l<d;l++){const u=s[l];if(u.POSITION!==void 0){const h=n.json.accessors[u.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(r.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),r.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),r.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){const w=Ot(Ge[h.componentType]);r.multiplyScalar(w)}c.max(r)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}o.expandByVector(c)}i.boundingBox=o;const a=new go;o.getCenter(a.center),a.radius=o.min.distanceTo(o.max)/2,i.boundingSphere=a}function ln(i,t,n){const e=t.attributes,o=[];function s(a,c){return n.getDependency("accessor",a).then(function(r){i.setAttribute(c,r)})}for(const a in e){const c=Nt[a]||a.toLowerCase();c in i.attributes||o.push(s(e[a],c))}if(t.indices!==void 0&&!i.index){const a=n.getDependency("accessor",t.indices).then(function(c){i.setIndex(c)});o.push(a)}return Zt.workingColorSpace!==we&&"COLOR_0"in e&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Zt.workingColorSpace}" not supported.`),ge(i,t),ws(i,t,n),Promise.all(o).then(function(){return t.targets!==void 0?fs(i,t.targets,n):i})}const un=new E(0,.15,0),bs=new Fo;function ys(i,t){return new Promise((n,e)=>{bs.load("/birthday_cake.glb",o=>{const s=o.scene,a=new ze().setFromObject(s),c=a.getSize(new E);a.getCenter(new E);const d=3.2/Math.max(c.x,c.y,c.z);s.scale.setScalar(d);const h=new ze().setFromObject(s).getCenter(new E);s.position.sub(h);const p=new ze().setFromObject(s);s.position.y-=p.min.y,i.add(s);const g=new Map;s.traverse(T=>{T.isMesh&&(T.castShadow=!0,T.receiveShadow=!0,g.set(T.uuid,T.material))});const w=vs(s),x=As();dn(s,x),n({model:s,gltf:o,candlePosition:w,applyWireframe:()=>dn(s,x),restoreOriginalMaterials:()=>Ms(s,g)})},o=>{t&&o.total&&t(o.loaded/o.total)},o=>{console.error("GLTFLoader error:",o),e(o)})})}const Ts=["candle","wick","flame","bougie","mèche","bougies","mech"];function vs(i){let t=null,n=-1/0;if(i.traverse(s=>{const a=s.name.toLowerCase();if(!Ts.some(l=>a.includes(l)))return;const r=new E;s.getWorldPosition(r),r.y>n&&(n=r.y,t=s)}),t){const s=new ze().setFromObject(t),a=new E((s.min.x+s.max.x)/2,s.max.y,(s.min.z+s.max.z)/2);return console.info(`[cake] Candle detected: "${t.name}" → top`,a),a.add(un)}const e=new ze().setFromObject(i),o=new E((e.min.x+e.max.x)/2,e.max.y,(e.min.z+e.max.z)/2).add(un);return console.info("[cake] No candle node found — using model top-centre fallback:",o),o}function As(){return new re({color:16720384,wireframe:!0,transparent:!0,opacity:.85})}function dn(i,t){i.traverse(n=>{n.isMesh&&(n.material=t)})}function Ms(i,t){i.traverse(n=>{n.isMesh&&t.has(n.uuid)&&(n.material=t.get(n.uuid))})}function Ss(){var i=64,t=document.createElement("canvas");t.width=i,t.height=i;var n=t.getContext("2d"),e=i/2,o=i/2,s=n.createRadialGradient(e,o,0,e,o,12);s.addColorStop(0,"rgba(255, 200, 100, 0.3)"),s.addColorStop(.5,"rgba(255, 150, 50, 0.15)"),s.addColorStop(1,"rgba(255, 100, 0, 0)"),n.fillStyle=s,n.fillRect(0,0,i,i);var a=n.createRadialGradient(e,o,0,e,o,8);a.addColorStop(0,"rgba(255, 200, 80, 0.9)"),a.addColorStop(.6,"rgba(255, 180, 50, 0.6)"),a.addColorStop(1,"rgba(255, 150, 30, 0)"),n.fillStyle=a,n.fillRect(0,0,i,i);var c=n.createRadialGradient(e,o,0,e,o,4);c.addColorStop(0,"rgba(255, 255, 255, 1)"),c.addColorStop(.5,"rgba(255, 255, 220, 0.9)"),c.addColorStop(1,"rgba(255, 240, 180, 0)"),n.fillStyle=c,n.beginPath(),n.arc(e,o,4,0,Math.PI*2),n.fill();var r=new bt(t);return r.minFilter=mt,r.magFilter=mt,r}function Es(i){var t=Ss(),n=new xt({map:t,transparent:!0,depthWrite:!1,blending:nt}),e=new wt(n);e.scale.set(.25,.25,.25),e.visible=!1,i.add(e);var o=new ht(16746496,2,1.5);e.add(o);for(var s=120,a=new _e,c=new Float32Array(s*3),r=new Float32Array(s),l=new Float32Array(s),d=new Float32Array(s*3),u=new Float32Array(s*3),h=0;h<s;h++)r[h]=999,l[h]=1;a.setAttribute("position",new ie(c,3)),a.setAttribute("age",new ie(r,1)),a.setAttribute("size",new ie(l,1)),a.setAttribute("color",new ie(d,3));var p=new xe({uniforms:{time:{value:0}},vertexShader:`
      attribute float age;
      attribute float size;
      varying float vAge;
      varying vec3 vColor;
      void main() {
        vAge = age;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        // Taper: particles shrink more aggressively with age
        gl_PointSize = size * (10.0 / -mvPosition.z) * (1.0 - age * 0.85);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      varying float vAge;
      varying vec3 vColor;
      void main() {
        if (vAge > 1.0) discard;
        float strength = distance(gl_PointCoord, vec2(0.5));
        if (strength > 0.5) discard;
        float alpha = 1.0 - (strength * 2.0);
        if (alpha <= 0.0) discard;
        // Fade alpha with age - tail disappears naturally
        gl_FragColor = vec4(vColor, alpha * (1.0 - vAge * 0.9) * 0.9);
      }
    `,transparent:!0,depthWrite:!1,blending:nt,vertexColors:!0}),g=new rt(a,p);g.frustumCulled=!1,i.add(g);var w=0,x=!1,T=new E,y=new E(0,0,1);function R(C,N){e.position.copy(C),e.visible=!0,g.visible=!0,x=!0,T.copy(C),N&&y.copy(N).normalize();for(var V=0;V<s;V++)r[V]=999}function M(C){C.lengthSq()>1e-4&&y.copy(C).normalize()}function B(C){e.scale.setScalar(C*.25)}function S(C,N){var V=e.scale.x;return P.to({t:0},{t:1,duration:N,ease:"power2.inOut",onUpdate:function(){var D=this.targets()[0].t,F=V+(C*.25-V)*D;e.scale.setScalar(F)}})}function v(){x=!1,e.visible=!1,g.visible=!1}function K(C){if(x){var N=e.position;y.subVectors(N,T),y.lengthSq()>1e-4&&y.normalize(),T.copy(N)}}function L(C,N){if(!x)return;const V=e.position,D=a.attributes.position.array,F=a.attributes.age.array,Z=a.attributes.size.array,W=a.attributes.color.array,q=u;for(let I=0;I<s;I++)if(F[I]<999){if(F[I]+=C/.5,F[I]>=1){F[I]=999;continue}D[I*3+0]+=q[I*3+0],D[I*3+1]+=q[I*3+1],D[I*3+2]+=q[I*3+2];const _=Math.sin(N*20+I*.7)*.003;D[I*3+0]+=_,D[I*3+1]+=_*.5;const G=F[I];if(G<.2){const z=G/.2;W[I*3+0]=1,W[I*3+1]=.95-z*.2,W[I*3+2]=.7-z*.4}else if(G<.5){const z=(G-.2)/.3;W[I*3+0]=1,W[I*3+1]=.75-z*.25,W[I*3+2]=.3-z*.3}else{const z=(G-.5)/.5;W[I*3+0]=1-z*.3,W[I*3+1]=.5-z*.5,W[I*3+2]=0}}for(let I=0;I<10;I++){w=(w+1)%s,D[w*3+0]=V.x-y.x*.02+(Math.random()-.5)*.008,D[w*3+1]=V.y-y.y*.02+(Math.random()-.5)*.008,D[w*3+2]=V.z-y.z*.02+(Math.random()-.5)*.008;const _=.06+Math.random()*.04,G=Math.random()<.95?1:.5,z=.008;q[w*3+0]=-y.x*_*G+(Math.random()-.5)*z,q[w*3+1]=-y.y*_*G+(Math.random()-.5)*z,q[w*3+2]=-y.z*_*G+(Math.random()-.5)*z,F[w]=0,Z[w]=3+Math.random()*4,W[w*3+0]=1,W[w*3+1]=.95,W[w*3+2]=.7}a.attributes.position.needsUpdate=!0,a.attributes.age.needsUpdate=!0,a.attributes.size.needsUpdate=!0,a.attributes.color.needsUpdate=!0}function j(C,N,V,D){var F={x:e.position.x,y:e.position.y,z:e.position.z};return P.to(F,{x:C.x,y:C.y,z:C.z,duration:N,ease:"power2.in",onUpdate:function(){e.position.set(F.x,F.y,F.z),V&&V(F)},onComplete:D})}function H(C,N){const V=n.color.clone(),D=new $(C);return P.to({t:0},{t:1,duration:N,ease:"power2.inOut",onUpdate:function(){const F=this.targets()[0].t,Z=V.clone().lerp(D,F);n.color.copy(Z),o.color.copy(Z)}})}return{mesh:e,light:o,activate:R,deactivate:v,update:K,updateParticles:L,flyTo:j,setColor:H,setScale:B,animateScale:S,setDirection:M}}function Cs(i){const n=new _e,e=new Float32Array(2e3*3),o=new Float32Array(2e3*3);for(let l=0;l<2e3;l++)e[l*3+0]=(Math.random()-.5)*20,e[l*3+1]=Math.random()*10,e[l*3+2]=(Math.random()-.5)*20,o[l*3+0]=(Math.random()-.5)*.003,o[l*3+1]=(Math.random()-.5)*.0015,o[l*3+2]=(Math.random()-.5)*.003;n.setAttribute("position",new ie(e,3));const s=new Bt({color:16724736,size:.045,transparent:!0,opacity:.55,sizeAttenuation:!0,depthWrite:!1}),a=new rt(n,s);a.frustumCulled=!1,i.add(a);function c(){const l=n.attributes.position.array;for(let d=0;d<2e3;d++)l[d*3+0]+=o[d*3+0],l[d*3+1]+=o[d*3+1],l[d*3+2]+=o[d*3+2],l[d*3+1]>10&&(l[d*3+1]=0),l[d*3+1]<0&&(l[d*3+1]=10);n.attributes.position.needsUpdate=!0}function r(){P.to(s,{opacity:0,duration:2,delay:.5})}return{points:a,update:c,transitionToPhase2:r}}function Rs(i,t){const e=new _e,o=new Float32Array(320*3),s=[];for(let h=0;h<320;h++){o[h*3+0]=t.x,o[h*3+1]=t.y,o[h*3+2]=t.z;const p=Math.random()*Math.PI*2,g=Math.random()*Math.PI,w=.04+Math.random()*.1;s.push(new E(Math.sin(g)*Math.cos(p)*w,Math.cos(g)*w*1.3,Math.sin(g)*Math.sin(p)*w))}e.setAttribute("position",new ie(o,3));const a=[16772608,16746496,16729224,16777215,8978431],c=new Bt({color:a[Math.floor(Math.random()*a.length)],size:.1,transparent:!0,opacity:1,sizeAttenuation:!0,depthWrite:!1}),r=new rt(e,c);r.frustumCulled=!1,i.add(r);let l=1,d=!1;function u(){if(d)return;if(l-=.018,l<=0){d=!0,i.remove(r),e.dispose(),c.dispose();return}c.opacity=Math.max(0,l);const h=e.attributes.position.array;for(let p=0;p<320;p++)h[p*3+0]+=s[p].x,h[p*3+1]+=s[p].y,h[p*3+2]+=s[p].z,s[p].y-=.0025;e.attributes.position.needsUpdate=!0}return{update:u,isDisposed:()=>d}}function Ps(i){const n=new An(.1,.1),e=new re({color:16777215,side:at}),o=new Dt(n,e,400),s=new Ft,a=[16729190,4491519,4517512,16746564,16763904],c=[];for(let u=0;u<400;u++){const h=(Math.random()-.5)*16,p=5+Math.random()*8,g=(Math.random()-.5)*14;c.push({x:h,y:p,z:g,rx:Math.random()*Math.PI,ry:Math.random()*Math.PI,rz:Math.random()*Math.PI,vx:(Math.random()-.5)*.02,vy:-.015-Math.random()*.02,vrx:(Math.random()-.5)*.1,vry:(Math.random()-.5)*.1,color:new $(a[Math.floor(Math.random()*a.length)])}),o.setColorAt(u,c[u].color)}o.instanceColor.needsUpdate=!0,o.visible=!1,i.add(o);const r=500,l=new Dt(n,e,r);for(let u=0;u<r;u++)s.position.set((Math.random()-.5)*12,.01+Math.random()*.02,(Math.random()-.5)*12),s.rotation.set(Math.PI/2,0,Math.random()*Math.PI),s.updateMatrix(),l.setMatrixAt(u,s.matrix),l.setColorAt(u,new $(a[Math.floor(Math.random()*a.length)]));l.instanceColor.needsUpdate=!0,l.visible=!1,i.add(l);let d=!1;return{activate(){d=!0,o.visible=!0,l.visible=!0},update(){if(d){for(let u=0;u<400;u++){const h=c[u];h.x+=h.vx,h.y+=h.vy,h.rx+=h.vrx,h.ry+=h.vry,h.y<-.5&&(h.y=8+Math.random()*4,h.x=(Math.random()-.5)*16),s.position.set(h.x,h.y,h.z),s.rotation.set(h.rx,h.ry,h.rz),s.updateMatrix(),o.setMatrixAt(u,s.matrix)}o.instanceMatrix.needsUpdate=!0}}}}function Ls(i){const n=new _e,e=new Float32Array(200*3),o=new Float32Array(200);for(let w=0;w<200;w++)e[w*3+0]=(Math.random()-.5)*16,e[w*3+1]=.5+Math.random()*9,e[w*3+2]=(Math.random()-.5)*16,o[w]=Math.random()*Math.PI*2;n.setAttribute("position",new ie(e,3)),n.setAttribute("phase",new ie(o,1));const s=new xe({uniforms:{time:{value:0},color:{value:new $(16766336)}},vertexShader:`
      attribute float phase;
      varying float vPhase;
      uniform float time;
      void main() {
        vPhase = phase;
        vec3 pos = position;
        pos.y += sin(time * 0.2 + phase) * 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (12.0 + sin(time + phase) * 4.0) * (10.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying float vPhase;
      uniform float time;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        // Soft circular alpha
        float alpha = (0.5 - dist) * 1.5;
        float pulse = 0.5 + 0.5 * sin(time * 1.5 + vPhase);
        gl_FragColor = vec4(color, alpha * pulse * 0.6);
      }
    `,transparent:!0,depthWrite:!1,blending:nt}),a=new rt(n,s);a.frustumCulled=!1,i.add(a);const c=new X,r=document.createElement("canvas");r.width=64,r.height=64;const l=r.getContext("2d");l.fillStyle="#ff6688",l.font="40px Arial",l.textAlign="center",l.textBaseline="middle",l.fillText("❤",32,32);const d=new bt(r),u=new xt({map:d,transparent:!0,opacity:0});for(let w=0;w<15;w++){const x=new wt(u);x.position.set((Math.random()-.5)*14,2+Math.random()*6,(Math.random()-.5)*14),x.scale.setScalar(.3+Math.random()*.3),x.userData={speedY:.01+Math.random()*.01,phase:Math.random()*10},c.add(x)}i.add(c);let h=!1;function p(){h=!0,P.to(s,{opacity:1,duration:2.5}),P.to(u,{opacity:.75,duration:2.5})}function g(w){h&&(s.uniforms.time.value=w,c.children.forEach(x=>{x.position.y+=x.userData.speedY,x.position.x+=Math.sin(w+x.userData.phase)*.005,x.position.y>10&&(x.position.y=0)}))}return{activate:p,update:g}}function Ds(i){const t=new xo(2228224,.6);i.add(t);const n=new wo(1703936,0,.4);i.add(n);const e=new Lt(16773344,0);e.position.set(4,10,6),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.near=.5,e.shadow.camera.far=30,e.shadow.camera.left=-8,e.shadow.camera.right=8,e.shadow.camera.top=8,e.shadow.camera.bottom=-8,e.shadow.bias=-.001,i.add(e);const o=new Lt(5605631,0);o.position.set(-6,4,-6),i.add(o);const s=new ht(16750899,0,4);i.add(s);const a=[16755200,16746564,16742280,16763972,16750933],c=a.map((x,T)=>{const y=T/a.length*Math.PI*2,R=new ht(x,0,9);return R.position.set(Math.cos(y)*6,2.5,Math.sin(y)*6),i.add(R),R}),r=new Mn(14,72),l=new b({color:657930,roughness:.9,metalness:.05}),d=new m(r,l);d.rotation.x=-Math.PI/2,d.receiveShadow=!0,i.add(d);const u=Is(i,a);function h(x){s.position.set(x.x,x.y+.08,x.z)}function p(){P.to(i.background,{r:.02,g:.01,b:.04,duration:2.5}),P.to(i.fog,{density:.018,duration:2.5}),P.to(l.color,{r:.07,g:.04,b:.1,duration:2.5}),P.to(t,{intensity:.9,duration:2.5}),P.to(t.color,{r:1,g:.95,b:.85,duration:2.5}),P.to(n,{intensity:1.2,duration:2.5}),P.to(n.color,{r:1,g:.85,b:.6,duration:2.5}),P.to(n.groundColor,{r:.08,g:.04,b:.1,duration:2.5}),P.to(e,{intensity:1.6,duration:2.5}),P.to(o,{intensity:.9,duration:2.5}),P.to(s,{intensity:2.8,duration:1.2}),c.forEach((T,y)=>{P.to(T,{intensity:1.2,duration:1.5,delay:.3+y*.15})}),u.reveal()}function g(x){s.intensity=2.8+Math.sin(x*9.7)*.4+Math.sin(x*17.3)*.2}function w(x){u.update(x)}return{ambientLight:t,hemiLight:n,dirLight:e,rimLight:o,candleLight:s,partyLights:c,floor:d,setCandlePosition:h,transitionToPhase2:p,updateCandleFlicker:g,updateBalloons:w}}function Is(i,t){const n=[],e=[],o=[],s=new O(1,32,32),a=new ee(.1,.2,.3,8);[{x:-4.5,z:-3},{x:4.5,z:-2.5},{x:-5,z:1.5},{x:5,z:2}].forEach(S=>{const v=3+Math.floor(Math.random()*3);for(let K=0;K<v;K++){const L=t[Math.floor(Math.random()*t.length)],j=new b({color:L,roughness:.3,metalness:.1}),H=new X,C=new m(s,j);C.scale.set(.6,.75,.6),H.add(C);const N=new m(a,j);N.position.y=-.8,H.add(N);const V=new yn({color:16777215,transparent:!0,opacity:.3}),D=new _e().setFromPoints([new E(0,-.8,0),new E(0,-4,0)]);H.add(new Tn(D,V));const F=S.x+(Math.random()-.5)*1.5,Z=S.z+(Math.random()-.5)*1.5,W=2+Math.random()*2.5;H.position.set(F,W-6,Z),H.userData={targetY:W,phaseOffset:Math.random()*Math.PI*2,speed:.8+Math.random()*.5},i.add(H),n.push(H)}}),[{x:-3.5,z:-2.5},{x:-4.5,z:.5},{x:3.5,z:-2},{x:4.5,z:1},{x:-2,z:-3},{x:2.5,z:-2.8}].forEach(S=>{const v=.5+Math.random()*.6,K=new ne(v,v,v),L=t[Math.floor(Math.random()*t.length)],j=new b({color:L,roughness:.8}),H=new m(K,j),C=new b({color:16777215,roughness:.5}),N=new m(new ne(v+.02,v+.02,v*.2),C),V=new m(new ne(v*.2,v+.02,v+.02),C);H.add(N,V),H.position.set(S.x,v/2-5,S.z),H.userData={targetY:v/2},H.rotation.y=Math.random()*Math.PI,i.add(H),e.push(H)});const l=new X;l.position.y=8,l.visible=!1,i.add(l);const d=new _t([new E(-10,5.5,-5),new E(-5,4,-6),new E(0,5,-7),new E(5,4,-6),new E(10,5.5,-5)]),u=new b({color:1118481,roughness:.9});l.add(new m(new Jt(d,64,.015,8,!1),u));const h=new O(.08,8,8);for(let S=0;S<=30;S++){const v=d.getPoint(S/30),K=t[Math.floor(Math.random()*t.length)],L=new m(h,new b({color:16777215,emissive:K,emissiveIntensity:1.5}));L.position.copy(v),l.add(L)}const p=new X;p.position.y=8,p.visible=!1,i.add(p);const g=new _t([new E(-8,6.5,-3),new E(0,5.5,-4),new E(8,6.5,-3)]);p.add(new m(new Jt(g,64,.01,8,!1),u));const w=new yt;w.moveTo(-.25,0).lineTo(.25,0).lineTo(0,-.6).lineTo(-.25,0);const x=new Tt(w);for(let S=1;S<16;S++){const v=g.getPoint(S/16),K=g.getTangent(S/16),L=t[Math.floor(Math.random()*t.length)],j=new m(x,new b({color:L,roughness:.9,side:at}));j.position.copy(v),j.lookAt(v.clone().add(K)),j.rotateY(Math.PI/2),p.add(j)}const T=new b({color:16119260,roughness:.9});new b({color:16777215,roughness:.8}),new b({color:16768928,roughness:.2,metalness:.8});const y=new b({color:16774630,roughness:.85,metalness:0}),R=new b({color:4863784,roughness:.7}),M=new b({color:16758465,roughness:.6});function B(S,v,K){const L=new X,j=new O(.5,20,20),H=new m(j,y);H.scale.set(1.1,.9,.9),H.position.y=.35;const C=new O(.3,16,16),N=new m(C,T);N.scale.set(1,.7,.6),N.position.set(0,.3,.35),L.add(N);const V=new O(.4,20,20),D=new m(V,y);D.position.set(0,.95,.05);const F=new O(.15,16,16),Z=new m(F,y);Z.position.set(-.3,1.2,.05);const W=new m(F,y);W.position.set(.3,1.2,.05);const q=new O(.08,12,12),I=new m(q,M);I.position.set(-.3,1.18,.12);const _=new m(q,M);_.position.set(.3,1.18,.12);const G=new O(.18,16,16),z=new m(G,T);z.position.set(0,.88,.35),z.scale.set(1.1,.8,.9);const oe=new O(.05,8,8),be=new m(oe,R);be.position.set(0,.92,.45),be.scale.set(1,.8,.8);const ce=new O(.05,8,8),Ee=new b({color:1710618,roughness:.2,metalness:.3}),Ce=new m(ce,Ee);Ce.position.set(-.15,.98,.32);const ye=new m(ce,Ee);ye.position.set(.15,.98,.32);const le=new O(.015,6,6),Re=new re({color:16777215}),J=new m(le,Re);J.position.set(-.12,1,.36);const Ne=new m(le,Re);Ne.position.set(.18,1,.36);const Te=new ot(.13,.25,12,12),fe=new m(Te,y);fe.position.set(-.45,.5,.2),fe.rotation.z=.3,fe.rotation.x=.8;const ue=new m(Te,y);ue.position.set(.45,.5,.2),ue.rotation.z=-.3,ue.rotation.x=.8;const it=new ot(.15,.2,12,12),Oe=new m(it,y);Oe.position.set(-.3,.15,.45),Oe.rotation.x=-.5,Oe.rotation.z=.2;const Pe=new m(it,y);Pe.position.set(.3,.15,.45),Pe.rotation.x=-.5,Pe.rotation.z=-.2;const ke=new O(.05,8,8),ve=new b({color:16765404,roughness:.7}),Ve=new m(ke,ve);Ve.position.set(-.3,.08,.6),Ve.scale.set(1,.5,.8);const We=new m(ke,ve);We.position.set(.3,.08,.6),We.scale.set(1,.5,.8);const ct=new ne(.2,.06,.06),Ye=new b({color:16739210,roughness:.4}),Xe=new m(ct,Ye);Xe.position.set(0,.65,.35);const Ue=new m(new ne(.12,.06,.04),Ye);Ue.position.set(-.12,.65,.35),Ue.rotation.z=.3;const Le=new m(new ne(.12,.06,.04),Ye);Le.position.set(.12,.65,.35),Le.rotation.z=-.3,L.add(H,D,Z,W,I,_),L.add(z,be,Ce,ye,J,Ne),L.add(fe,ue,Oe,Pe,Ve,We),L.add(Xe,Ue,Le);const Qe=0;L.position.set(S,Qe-5,v),L.rotation.y=K,L.userData={targetY:Qe},i.add(L),o.push(L)}return B(-3,1.5,.6),{reveal(){e.forEach((S,v)=>P.to(S.position,{y:S.userData.targetY,duration:1.2,delay:.4+v*.1,ease:"back.out(1.5)"})),o.forEach((S,v)=>P.to(S.position,{y:S.userData.targetY,duration:1.2,delay:.5+v*.08,ease:"back.out(1.5)"})),n.forEach((S,v)=>P.to(S.position,{y:S.userData.targetY,duration:1.5,delay:.6+v*.05,ease:"back.out(1.2)"})),l.visible=!0,p.visible=!0,P.to(l.position,{y:0,duration:2,ease:"power2.out",delay:.3}),P.to(p.position,{y:0,duration:2,ease:"power2.out",delay:.5})},update(S){n.forEach(v=>v.position.y=v.userData.targetY+Math.sin(S*v.userData.speed+v.userData.phaseOffset)*.3)}}}function _s(i){const t=document.createElement("style");t.textContent=`
    #ui-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 20;
      pointer-events: none;
    }

    .ui-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      pointer-events: auto;
      animation: ui-rise 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      opacity: 0;
    }

    @keyframes ui-rise {
      from { opacity: 0; transform: translateY(40px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }

    .ui-eyebrow {
      font-size: clamp(0.7rem, 1.8vw, 0.95rem);
      font-weight: 300;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: #fff;
      text-shadow: none;
    }

    .ui-heading {
      font-size: clamp(2.0rem, 5vw, 4.2rem);
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.04em;
      line-height: 1;
      text-shadow: none;
    }

    .ready-btn {
      position: relative;
      padding: 10px 28px;
      min-width: 140px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .ready-btn:hover {
      transform: scale(1.04) translateY(-1px);
      border-color: rgba(255, 255, 255, 0.3);

    }

    .ready-btn:active { transform: scale(0.98); }

    .btn-label {
      position: relative;
      z-index: 2;
      font-size: clamp(0.85rem, 1.8vw, 1.0rem);
      font-weight: 400;
      letter-spacing: 0.35em;
      color: #fff;
      text-shadow: none;
    }

    .golden-ember {
      position: absolute;
      left: 18px; /* Adjust as needed for exact positioning */
      top: 50%;
      transform: translateY(-50%);
      width: 10px; /* 8-12px */
      height: 10px; /* 8-12px */
      border-radius: 50%;
      background-color: #ffaa00; /* Golden color */
      box-shadow: 0 0 5px #ffaa00, 0 0 8px rgba(255, 170, 0, 0.6); /* Subtle warm glow (5-10px radius) */
      z-index: 1; /* Below the label */
    }





    /* Instruction hint below button */
    .ui-hint {
      font-size: clamp(0.65rem, 1.4vw, 0.75rem);
      font-weight: 300;
      letter-spacing: 0.25em;
      color: #fff;
    }

    /* Interactive mode hints */
    #interactive-hints {
      position: absolute;
      left: 32px;
      bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      opacity: 0;
      pointer-events: none;
      z-index: 30;
    }

    .hint-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hint-icon {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
    }

    .hint-icon svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: rgba(255,255,255,0.8);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .hint-text {
      display: flex;
      flex-direction: column;
    }

    .hint-text-main {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.9);
    }

    .hint-text-sub {
      font-size: 0.6rem;
      font-weight: 300;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.4);
    }
  `,document.head.appendChild(t);const n=document.createElement("div");n.id="ui-overlay",n.innerHTML=`
    <div class="ui-card">
      <p class="ui-eyebrow">A magical moment awaits</p>
      <h1 class="ui-heading">Are you ready?</h1>
      <button id="ready-btn" class="ready-btn" aria-label="Start the experience">
        <span class="golden-ember"></span>
        <span class="btn-label">READY</span>
      </button>
      <p class="ui-hint">Click to begin</p>
    </div>
  `,i.appendChild(n);const e=document.createElement("div");e.id="interactive-hints",e.innerHTML=`
    <div class="hint-item">
      <div class="hint-icon">
        <svg viewBox="0 0 24 24">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
      <div class="hint-text">
        <span class="hint-text-main">DRAG</span>
        <span class="hint-text-sub">TO ROTATE</span>
      </div>
    </div>
    <div class="hint-item">
      <div class="hint-icon">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      </div>
      <div class="hint-text">
        <span class="hint-text-main">SCROLL</span>
        <span class="hint-text-sub">TO ZOOM</span>
      </div>
    </div>
  `,i.appendChild(e);let o=null;const s=n.querySelector("#ready-btn");s.addEventListener("click",()=>{o&&(s.disabled=!0,o())});function a(){return new Promise(l=>{P.to(n,{opacity:0,duration:.9,ease:"power2.in",onComplete(){n.style.pointerEvents="none",n.style.display="none",l()}})})}function c(l){o=l}function r(){P.to(e,{opacity:1,duration:1.5,ease:"power2.out"})}return{overlay:n,hide:a,onReady:c,showInteractiveHints:r}}function Ns(i){const t=new An(200,200),n=new re({color:16777215,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:at}),e=new m(t,n);e.renderOrder=999,e.frustumCulled=!1,i.add(e);function o(s){const a=new E;return s.getWorldDirection(a),e.position.copy(s.position).addScaledVector(a,.6),e.quaternion.copy(s.quaternion),P.timeline().to(n,{opacity:1,duration:.12,ease:"power4.out"}).to(n,{opacity:0,duration:1.6,ease:"power3.out"})}return{mesh:e,mat:n,trigger:o}}function Os(i){const t=new st(.5,.06,10,80),n=new re({color:16775372,transparent:!0,opacity:0,side:at,depthWrite:!1}),e=new m(t,n);e.rotation.x=Math.PI/2,i.add(e);function o(s){return e.position.copy(s),e.scale.setScalar(.01),n.opacity=1,P.timeline().to(e.scale,{x:25,y:25,z:25,duration:1.8,ease:"power2.out"}).to(n,{opacity:0,duration:1.8,ease:"power2.in"},"<")}return{mesh:e,mat:n,trigger:o}}function ks(i){const t=document.createElement("canvas");t.width=1600,t.height=600;const n=t.getContext("2d");n.clearRect(0,0,t.width,t.height),n.textAlign="center",n.textBaseline="middle";const e="HAPPY BIRTHDAY",o="Thanh Tuyền",s=t.width/2,a=t.height*.38,c=t.height*.75;n.font='bold 130px "Outfit", Arial, sans-serif',n.fillStyle="#ffffff",n.shadowColor="rgba(255, 150, 80, 0.6)",n.shadowBlur=20,n.fillText(e,s,a),n.shadowColor="rgba(255, 100, 50, 0.5)",n.shadowBlur=50,n.fillText(e,s,a),n.font='700 120px "Dancing Script", cursive',n.fillStyle="#ff4d6d",n.shadowColor="rgba(255, 77, 109, 0.5)",n.shadowBlur=12,n.fillText(o,s,c),n.shadowColor="rgba(255, 77, 109, 0.3)",n.shadowBlur=25,n.fillText(o,s,c);const r=new bt(t);r.colorSpace=Ie;const l=new xt({map:r,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1}),d=new wt(l),u=7.5,h=u*(t.height/t.width);d.scale.set(u,h,1);const p=4.2;d.position.set(0,p,-1),d.visible=!1,i.add(d);let g=!1;return{sprite:d,mat:l,show(w=2){d.visible=!0,P.to(l,{opacity:1,duration:w,ease:"power2.inOut"})},hide(w=1){P.to(l,{opacity:0,duration:w,onComplete:()=>{d.visible=!1}})},update(w,x){if(!g&&d.visible&&(g=!0),!!g&&(d.position.y=p+Math.sin(w*1.5)*.15,x)){d.lookAt(x.position);const T=x.position.distanceTo(d.position),y=x.fov*Math.PI/180,B=2*Math.tan(y/2)*T*x.aspect*.85;let S=1;u>B&&(S=B/u),d.scale.set(u*S,h*S,1)}}}}function Us(i,t){const o=document.createElement("canvas");o.width=80,o.height=160;const s=o.getContext("2d");function a(h){s.clearRect(0,0,80,160);const p=s.createRadialGradient(80/2,160*.65,4,80/2,160*.55,80*.55);p.addColorStop(0,"rgba(255,255,180,1)"),p.addColorStop(.25,`rgba(255,${160+h*20|0},40,0.85)`),p.addColorStop(.65,"rgba(255,80,10,0.3)"),p.addColorStop(1,"rgba(200,30,0,0)"),s.fillStyle=p,s.beginPath(),s.ellipse(80/2,160*.6,80*.38,160*.42,0,0,Math.PI*2),s.fill();const g=s.createRadialGradient(80/2,160*.68,1,80/2,160*.65,80*.2);g.addColorStop(0,"rgba(255,255,255,1)"),g.addColorStop(.5,"rgba(255,240,140,0.8)"),g.addColorStop(1,"rgba(255,180,60,0)"),s.fillStyle=g,s.beginPath(),s.ellipse(80/2,160*.68,80*.18,80*.24,0,0,Math.PI*2),s.fill()}a(0);const c=new bt(o),r=new xt({map:c,transparent:!0,opacity:0,blending:nt,depthWrite:!1}),l=new wt(r);l.scale.set(.22,.44,1),l.position.copy(t),l.position.y+=.06,i.add(l);function d(){return P.to(r,{opacity:1,duration:.6,ease:"power2.out"})}function u(h){const p=Math.sin(h*14.3)*.5+.5;l.scale.x=.22+Math.sin(h*11.7)*.018,l.scale.y=.44+Math.sin(h*8.1)*.025,Math.floor(h*60)%4===0&&(a(p),c.needsUpdate=!0)}return{sprite:l,mat:r,show:d,update:u}}function Fs(i){const t=document.createElement("div");return t.style.cssText=`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 8;
    background: radial-gradient(ellipse at center,
      transparent 45%,
      rgba(0,0,0,0.55) 100%
    );
  `,i.appendChild(t),t}function Bs(i){const{scene:t,camera:n,controls:e,bloomPass:o,spark:s,dust:a,confetti:c,bokeh:r,env:l,flash:d,energyWave:u,birthdayText:h,candleFlame:p,candlePosition:g,restoreOriginalMaterials:w,enableOrbit:x,explosionUpdaters:T,frDuration:y,onRevealComplete:R}=i,M=s.mesh.position.clone(),B=[M,new E(M.x+(g.x-M.x)*.3,M.y+(g.y-M.y)*.3+2,M.z+(g.z-M.z)*.3+2),new E(M.x+(g.x-M.x)*.7,M.y+(g.y-M.y)*.7+.5,M.z+(g.z-M.z)*.7-1),g],S=new _t(B);S.curveType="centripetal";const v=[];t.traverse(D=>{D.userData&&D.userData.targetY!==void 0&&D.userData.phaseOffset!==void 0&&(D.visible=!1,v.push(D))});const K=S.getTangent(0),L={x:M.x-K.x*3,y:M.y+2,z:M.z-K.z*3},j={x:M.x,y:M.y,z:M.z},H={intensity:0},C=P.timeline({defaults:{ease:"none"}}),N=Math.max(y-2,1.5);C.to(n.position,{x:L.x,y:L.y,z:L.z,duration:.15,ease:"power2.out",onUpdate(){n.lookAt(M)}});const V={progress:0};return C.to(V,{progress:1,duration:N,ease:"power2.inOut",onUpdate(){const D=V.progress,F=S.getPoint(D),Z=(Math.random()-.5)*.08;j.x=F.x+Z,j.y=F.y+Z,j.z=F.z+Z,s.mesh.position.set(j.x,j.y,j.z);const W=Math.max(0,D-.08),q=S.getPoint(W),I=S.getTangent(W),_=2.5+(1-D)*2,G=1.8+(1-D)*.8;if(n.position.set(q.x-I.x*_,q.y+G,q.z-I.z*_),Math.sqrt(n.position.x**2+n.position.z**2)<2){const oe=Math.atan2(n.position.z,n.position.x);n.position.x=Math.cos(oe)*2,n.position.z=Math.sin(oe)*2}n.position.x+=(Math.random()-.5)*H.intensity,n.position.y+=(Math.random()-.5)*H.intensity,n.position.z+=(Math.random()-.5)*H.intensity,n.lookAt(j.x,j.y,j.z)}}),C.to(H,{intensity:.08,duration:N,ease:"power2.in"},"<"),C.to(o,{strength:1.5,radius:.39,duration:N,ease:"power2.in"},"<"),C.call(()=>{s.setColor(16746496,N*.4)},[],"<"),C.call(()=>{s.setColor(16768324,N*.6)},[],"<"+N*.4),C.call(()=>{s.deactivate(),H.intensity=0,d.trigger(n),u.trigger(g);const D=Rs(t,g);T.push(D),P.to(o,{strength:3.5,radius:.8,duration:.3,ease:"power4.out"})}),C.call(()=>{w(),P.to(o,{strength:.35,radius:.3,threshold:.4,duration:2.5,ease:"power2.out"}),l.transitionToPhase2(),v.forEach(D=>{D.visible=!0}),p.show(),c.activate(),r.activate(),a.transitionToPhase2(),R&&R()}),C.call(()=>{h.show()},[],"+=1.5"),C.to({},{duration:.5}),C.to(n.position,{x:0,y:4.5,z:11.5,duration:3.8,ease:"power2.inOut",onUpdate(){n.lookAt(0,2.5,0)}}),C.to({},{duration:2.5}),C.call(()=>{n.lookAt(0,1.8,0),e.target.set(0,1.8,0),x()}),C}const kt=new b({color:16777215,roughness:.7}),Hs=new b({color:16766720,roughness:.3,metalness:.6});new b({color:12632256,roughness:.2,metalness:.8});const zs=new b({color:16729156,roughness:.7}),Gs=new b({color:4491519,roughness:.7}),js=new b({color:4508740,roughness:.7}),Ks=new b({color:16768324,roughness:.7}),Vs=new b({color:16746564,roughness:.7}),Ws=new b({color:16746666,roughness:.7}),Ys=new b({color:11167487,roughness:.7}),Xs=new b({color:4513228,roughness:.7});new b({color:9127187,roughness:.9});const fn=new b({color:16774630,roughness:.85});new b({color:16119260,roughness:.9});new b({color:4863784,roughness:.7});const Qs=new b({color:16765404,roughness:.7});new b({color:7027242,roughness:.8});const qs=new b({color:13413102,roughness:.7}),Zs=new b({color:8969659,roughness:.7}),Js=new b({color:16744319,roughness:.7}),$s=new b({color:8965375,roughness:.7});new b({color:16768358,roughness:.3,emissive:16768358,emissiveIntensity:.4});const gt=[zs,Gs,js,Ks,Vs,Ws,Ys,Xs,Js,$s,qs,Zs];function Se(){return gt[Math.floor(Math.random()*gt.length)]}function Pn(i,t){const n=new X,e=new m(new ne(i,i,i),t);e.castShadow=!0,n.add(e);const o=new b({color:16777215,roughness:.5,metalness:.2}),s=new m(new ne(i+.02,i+.02,i*.15),o),a=new m(new ne(i*.15,i+.02,i+.02),o);n.add(s,a);const c=new b({color:16768324,roughness:.4,metalness:.3}),r=new m(new ne(i*.3,i*.08,i*.08),c);r.position.set(i*.15,i*.55,0),r.rotation.z=.3;const l=new m(new ne(i*.3,i*.08,i*.08),c);return l.position.set(-i*.15,i*.55,0),l.rotation.z=-.3,n.add(r,l),n}function ea(i,t){const n=new X;let e=0;for(let o=0;o<i;o++){const s=t*(1-o*.15),a=Pn(s,Se());a.position.y=e+s/2,a.rotation.y=Math.random()*Math.PI,n.add(a),e+=s}return n}function Ln(){const i=new X,t=new b({color:14329120,roughness:.8}),n=new m(new ee(.18,.22,.2,12),t);n.position.y=.1,n.castShadow=!0,i.add(n);const e=Se(),o=new m(new O(.18,10,10),e);o.position.y=.28,o.scale.set(1.1,.6,1.1),i.add(o);const s=new b({color:16720452,roughness:.4}),a=new m(new O(.05,8,8),s);a.position.y=.38,i.add(a);const c=new b({color:16768426,roughness:.9}),r=new m(new ee(.2,.24,.12,12,1,!0),c);return r.position.y=.02,i.add(r),i}function ta(){const i=new X,t=new b({color:14329120,roughness:.7}),n=new m(new st(.15,.06,10,20),t);n.rotation.x=Math.PI/2,n.castShadow=!0,i.add(n);const e=Se(),o=new m(new st(.15,.035,8,20),e);o.rotation.x=Math.PI/2,o.position.y=.03,i.add(o);const s=new b({color:16777215,roughness:.5});for(let a=0;a<6;a++){const c=a/6*Math.PI*2,r=new m(new ne(.02,.02,.04),s);r.position.set(Math.cos(c)*.1,.06,Math.sin(c)*.1),r.rotation.y=c,i.add(r)}return i}function na(){const i=new X,t=new b({color:13395507,roughness:.9}),n=new m(new ee(.15,.12,.2,10),t);n.position.y=.1,n.castShadow=!0,i.add(n);const e=new b({color:4008735,roughness:1}),o=new m(new Mn(.13,10),e);o.rotation.x=-Math.PI/2,o.position.y=.2,i.add(o);const s=new b({color:2263842,roughness:.9}),a=new m(new ee(.008,.01,.3,6),s);a.position.y=.35,i.add(a);const c=new b({color:3329330,roughness:.8}),r=new m(new O(.05,6,6),c);r.position.set(.04,.25,0),r.scale.set(1.5,.3,.8),i.add(r);const l=new m(new O(.05,6,6),c);l.position.set(-.04,.3,0),l.scale.set(1.5,.3,.8),i.add(l);const d=Se();for(let p=0;p<6;p++){const g=p/6*Math.PI*2,w=new m(new O(.05,6,6),d);w.position.set(Math.cos(g)*.06,.5,Math.sin(g)*.06),w.scale.set(1.2,.5,1.2),i.add(w)}const u=new b({color:16776960,roughness:.6}),h=new m(new O(.03,8,8),u);return h.position.y=.5,i.add(h),i}function oa(){const i=new X,t=new b({color:9139029,roughness:.9}),n=new m(new ee(.008,.01,.5,6),t);n.position.y=.25,i.add(n);const e=new yt;e.moveTo(0,0),e.lineTo(.08,.08),e.lineTo(0,.15),e.closePath();const o=new Tt(e);for(let a=0;a<4;a++){const c=new m(o,gt[(a+Math.floor(Math.random()*8))%gt.length]);c.position.y=.5,c.rotation.y=a/4*Math.PI*2,i.add(c)}const s=new m(new O(.015,6,6),Hs);return s.position.y=.5,i.add(s),i}function sa(){const i=new X,t=2+Math.floor(Math.random()*2);let n=0;for(let e=0;e<t;e++){const o=.12+Math.random()*.06,s=new m(new ne(o,o,o),Se());s.position.y=n+o/2,s.rotation.y=Math.random()*.3,s.castShadow=!0,i.add(s),n+=o}return i}function aa(){const i=new X,t=Se(),n=new m(new vt(.12,.25,10),t);n.position.y=.125,n.castShadow=!0,i.add(n);const e=new b({color:16777215,roughness:.8}),o=new m(new O(.03,6,6),e);o.position.y=.27,i.add(o);const s=new b({color:16777215,roughness:.5,emissive:16777215,emissiveIntensity:.1}),a=new m(new st(.08,.01,6,12),s);return a.position.y=.08,a.rotation.x=Math.PI/2,i.add(a),i}function ra(){const i=new X,t=new b({color:16737860,roughness:.7}),n=new m(new ee(.06,.08,.25,10),t);n.position.y=.125,n.castShadow=!0,i.add(n);const e=new b({color:8939076,roughness:.9}),o=new m(new ee(.015,.02,.1,6),e);o.position.y=-.05,i.add(o);const s=new b({color:16763904,roughness:.6}),a=new m(new vt(.05,.08,8),s);a.position.y=.27,i.add(a);const c=new b({color:16746666,roughness:.5});for(let r=0;r<5;r++){const l=r/5*Math.PI*2,d=new m(new ne(.005,.06,.005),c);d.position.set(Math.cos(l)*.04,.32,Math.sin(l)*.04),d.rotation.z=Math.cos(l)*.5,d.rotation.x=Math.sin(l)*.5,i.add(d)}return i}function ia(){const i=new X,t=new m(new O(.25,12,12),fn);t.scale.set(1.1,.9,.9),t.position.y=.2,t.castShadow=!0,i.add(t);const n=new m(new O(.18,12,12),fn);n.position.set(0,.48,.05),i.add(n);const e=new b({color:16773350,roughness:.85}),o=new ot(.035,.15,6,8),s=new m(o,e);s.position.set(-.1,.62,.02),s.rotation.z=.2,s.rotation.x=-.2,i.add(s);const a=new m(o,e);a.position.set(.1,.62,.02),a.rotation.z=-.2,a.rotation.x=-.2,i.add(a);const c=new b({color:16758465,roughness:.7}),r=new ot(.018,.1,6,6),l=new m(r,c);l.position.set(-.1,.62,.06),l.rotation.z=.2,l.rotation.x=-.2,i.add(l);const d=new m(r,c);d.position.set(.1,.62,.06),d.rotation.z=-.2,d.rotation.x=-.2,i.add(d);const u=new b({color:1710618,roughness:.2,metalness:.3}),h=new O(.025,8,8),p=new m(h,u);p.position.set(-.07,.5,.16),i.add(p);const g=new m(h,u);g.position.set(.07,.5,.16),i.add(g);const w=new m(new O(.015,6,6),Qs);w.position.set(0,.46,.2),i.add(w);const x=new m(new O(.05,8,8),kt);return x.position.set(0,.15,-.22),i.add(x),i}function ca(){const i=new X,t=new b({color:1710638,roughness:.8}),n=new m(new O(.22,12,12),t);n.scale.set(1,1.1,.9),n.position.y=.2,n.castShadow=!0,i.add(n);const e=new m(new O(.14,10,10),kt);e.scale.set(.8,.9,.6),e.position.set(0,.2,.15),i.add(e);const o=new m(new O(.14,10,10),t);o.position.set(0,.42,.05),i.add(o);const s=new m(new O(.09,8,8),kt);s.scale.set(.9,.7,.6),s.position.set(0,.4,.14),i.add(s);const a=new b({color:1710618,roughness:.2,metalness:.3}),c=new O(.02,8,8),r=new m(c,a);r.position.set(-.05,.44,.18),i.add(r);const l=new m(c,a);l.position.set(.05,.44,.18),i.add(l);const d=new b({color:16746496,roughness:.6}),u=new m(new vt(.025,.05,6),d);u.position.set(0,.4,.2),u.rotation.x=.3,i.add(u);const h=new b({color:16746496,roughness:.7}),p=new O(.04,8,8),g=new m(p,h);g.scale.set(1.2,.5,.8),g.position.set(-.08,.04,.08),i.add(g);const w=new m(p,h);w.scale.set(1.2,.5,.8),w.position.set(.08,.04,.08),i.add(w);const x=new b({color:1710638,roughness:.8}),T=new ot(.025,.1,6,6),y=new m(T,x);y.position.set(-.18,.2,0),y.rotation.z=.4,y.rotation.x=-.3,i.add(y);const R=new m(T,x);R.position.set(.18,.2,0),R.rotation.z=-.4,R.rotation.x=-.3,i.add(R);const M=new b({color:16729224,roughness:.4}),B=new m(new ne(.08,.03,.03),M);return B.position.set(0,.3,.15),i.add(B),i}function la(){const i=new X,t=new b({color:16777215,roughness:.2,metalness:.4}),n=new m(new ee(.15,.2,.3,10),t);n.position.y=.15,i.add(n);const e=new m(new ee(.3,.25,.03,16),t);e.position.y=.32,i.add(e);const o=new b({color:16772829,roughness:.7}),s=new m(new ee(.15,.18,.1,12),o);s.position.y=.4,i.add(s);const a=new b({color:16746683,roughness:.5}),c=new m(new ee(.16,.16,.03,12),a);c.position.y=.45,i.add(c);const r=new b({color:16755421,roughness:.6}),l=new m(new ee(.01,.012,.06,6),r);l.position.y=.49,i.add(l);const d=new b({color:16755200,emissive:16746496,emissiveIntensity:2}),u=new m(new O(.008,6,6),d);return u.position.y=.53,u.scale.set(.8,1.5,.8),i.add(u),i}function ua(){const i=new X,t=new b({color:8947848,roughness:.5,metalness:.6}),n=new m(new ee(.008,.01,.3,6),t);n.position.y=.15,i.add(n);const e=new b({color:16768324,emissive:16755200,emissiveIntensity:1.5,roughness:.3,metalness:.5}),o=new m(new bo(.06),e);o.position.y=.32,o.rotation.y=Math.random()*Math.PI,i.add(o);const s=new b({color:16768324,emissive:16746496,emissiveIntensity:.5,transparent:!0,opacity:.3}),a=new m(new O(.1,8,8),s);return a.position.y=.32,i.add(a),i}function da(){const i=new X,t=new b({color:13404228,roughness:.3,metalness:.7,wireframe:!0}),n=new m(new O(.1,6,6),t);n.position.y=.15,i.add(n);const e=new b({color:16755268,emissive:16737792,emissiveIntensity:1,transparent:!0,opacity:.6}),o=new m(new O(.07,8,8),e);o.position.y=.15,i.add(o);const s=new b({color:13404228,roughness:.3,metalness:.7}),a=new m(new st(.02,.005,6,8),s);a.position.y=.22,i.add(a);const c=new b({color:16737860,roughness:.7}),r=new m(new vt(.015,.03,6),c);return r.position.y=.06,i.add(r),i}function fa(){const i=new X,t=[16729224,4521864,4491519,16746564,11158783][Math.floor(Math.random()*5)],n=new b({color:t,emissive:t,emissiveIntensity:1.5,transparent:!0,opacity:.8}),e=new m(new O(.03,8,8),n);e.position.y=.05,i.add(e);const o=new b({color:t,emissive:t,emissiveIntensity:.5,transparent:!0,opacity:.2}),s=new m(new O(.06,8,8),o);return s.position.y=.05,i.add(s),i}function ha(){const i=new X,t=new b({color:9139029,roughness:.9}),n=new m(new ee(.005,.008,.4,6),t);n.position.y=.2,i.add(n);const e=Se(),o=new yt;o.moveTo(0,0),o.lineTo(.12,0),o.lineTo(0,-.08),o.closePath();const s=new Tt(o),a=new m(s,e);return a.position.set(0,.38,0),a.rotation.y=-Math.PI/2,i.add(a),i}function pa(){const i=new X,t=new b({color:16777215,roughness:.2,metalness:.2}),n=new m(new ee(.3,.32,.03,16),t);n.position.y=.015,i.add(n);const e=new b({color:16772829,roughness:.7}),o=new yt;o.moveTo(0,0),o.lineTo(.08,.04),o.lineTo(.08,-.04),o.closePath();const s=new Tt(o),a=new m(s,e);a.position.set(.05,.04,0),a.rotation.x=-Math.PI/2,i.add(a);const c=Ln();return c.position.set(-.08,.04,.05),c.scale.setScalar(.8),i.add(c),i}const ma=[["giftBox",3.5,-3.5,.3,.8],["giftBox",-3.8,-3,-.5,1],["giftBox",4,2.5,1.2,.7],["giftBox",-4.2,2.8,.8,.9],["giftBox",3.2,-4,-.2,1.1],["giftBox",-3.5,3.5,.5,.6],["cupcake",4,-1.5,0,1],["cupcake",-4,-1.8,.5,.9],["cupcake",1.8,4,1,1.1],["cupcake",-2,-4,-.3,.8],["donut",4.2,-1,0,1],["donut",-3.5,2,.7,.9],["donut",3.5,3,-.4,1.1],["flowerPot",4.5,.5,0,1],["flowerPot",-4.5,-.5,.6,.9],["flowerPot",2.5,-4.2,-.8,1.1],["flowerPot",-2.8,4,.3,.8],["pinwheel",3,-4.5,0,1],["pinwheel",-4.5,1,.5,.9],["pinwheel",4.5,1.8,-.3,1.1],["toyBlocks",4,-2.8,0,1],["toyBlocks",-3,4.2,.8,.9],["toyBlocks",-4,2,-.5,1.1],["birthdayHat",3.5,4,0,1],["birthdayHat",-4,-2.5,.4,.9],["birthdayHat",2,-4.5,-.6,1.1],["partyPopper",4.5,-3,0,1],["partyPopper",-4.5,3,.5,.9],["plushRabbit",-5.5,-1.5,.8,1],["plushPenguin",5.5,1.5,-.5,1],["plushRabbit",-5,4.5,.3,.9],["giftStack",5.5,-3,0,1],["giftStack",-5.5,3,.7,.9],["giftStack",5,-5,-.4,1.1],["miniCakeStand",5.5,0,0,1],["miniCakeStand",-5.5,0,.5,.9],["dessertPlate",5,3.5,0,1],["dessertPlate",-5,-3.5,.6,.9],["glowingStar",6,-1,0,1],["glowingStar",-6,1,.5,.9],["glowingStar",5.5,4,-.3,1.1],["glowingStar",-5.5,-4,.2,.8],["decorativeLantern",5,3.5,0,1],["decorativeLantern",-5,-3.5,.5,.9],["decorativeLantern",6.5,0,-.2,1.1],["fairyLantern",5.5,5,0,1],["fairyLantern",-5.5,-5,.3,.9],["fairyLantern",6.5,-3,-.5,1.1],["celebrationFlag",-6,-2,0,1],["celebrationFlag",6,2,.6,.9],["celebrationFlag",-5.5,-4.5,-.3,1.1],["celebrationFlag",5.5,4.5,.4,.8]];function ga(i,t){switch(i){case"giftBox":{const n=.3+Math.random()*.2,e=Pn(n,Se());return e.scale.setScalar(t),e}case"giftStack":{const n=2+Math.floor(Math.random()*2),e=ea(n,.3);return e.scale.setScalar(t),e}case"cupcake":{const n=Ln();return n.scale.setScalar(t),n}case"donut":{const n=ta();return n.scale.setScalar(t),n}case"flowerPot":{const n=na();return n.scale.setScalar(t),n}case"pinwheel":{const n=oa();return n.scale.setScalar(t),n}case"toyBlocks":{const n=sa();return n.scale.setScalar(t),n}case"birthdayHat":{const n=aa();return n.scale.setScalar(t),n}case"partyPopper":{const n=ra();return n.scale.setScalar(t),n}case"plushRabbit":{const n=ia();return n.scale.setScalar(t),n}case"plushPenguin":{const n=ca();return n.scale.setScalar(t),n}case"miniCakeStand":{const n=la();return n.scale.setScalar(t),n}case"glowingStar":{const n=ua();return n.scale.setScalar(t),n}case"decorativeLantern":{const n=da();return n.scale.setScalar(t),n}case"fairyLantern":{const n=fa();return n.scale.setScalar(t),n}case"celebrationFlag":{const n=ha();return n.scale.setScalar(t),n}case"dessertPlate":{const n=pa();return n.scale.setScalar(t),n}default:return new X}}function xa(i){const t=[];ma.forEach(([o,s,a,c,r])=>{const l=ga(o,r);if(!l)return;l.position.set(s,-5,a),l.rotation.y=c+(Math.random()-.5)*.2;const d=.005+Math.random()*.01;l.userData={targetY:d,type:o},l.traverse(u=>{u.isMesh&&(u.castShadow=!0,u.receiveShadow=!0)}),i.add(l),t.push(l)});function n(){t.forEach((o,s)=>{P.to(o.position,{y:o.userData.targetY,duration:1+Math.random()*.6,delay:.2+s*.025,ease:"back.out(1.5)"})})}function e(o){t.forEach(s=>{s.userData.type==="fairyLantern"&&(s.position.y=s.userData.targetY+Math.sin(o*.8+s.position.x*2)*.015),s.userData.type==="decorativeLantern"&&(s.position.y=s.userData.targetY+Math.sin(o*.5+s.position.z*2)*.01),s.userData.type==="glowingStar"&&(s.position.y=s.userData.targetY+Math.sin(o*.6+s.position.x)*.008)})}return{reveal:n,update:e}}async function wa(){const i=document.getElementById("app");Fs(i);const{scene:t,renderer:n}=Io(i),{camera:e,controls:o}=ko(n),{composer:s,bloomPass:a,bokehPass:c}=_o(n,t,e),r=document.getElementById("loading-fill"),l=document.getElementById("loading-pct"),d=document.getElementById("loading-screen");let u;try{u=await ys(t,_=>{const G=Math.round(_*100);r&&(r.style.width=`${G}%`),l&&(l.textContent=`${G}%`)})}catch(_){console.error("Failed to load birthday_cake.glb:",_),l&&(l.textContent="Failed to load model.");return}d&&(d.classList.add("hidden"),setTimeout(()=>d.remove(),900));const{model:h,candlePosition:p,restoreOriginalMaterials:g}=u,w=new yo;e.add(w);const x=new To,T=new $t(w);let y=4;try{const _=await x.loadAsync("audio/fr.wav");T.setBuffer(_),T.setVolume(1),y=_.duration}catch(_){console.warn("Failed to load fr.wav:",_)}const R=new $t(w);try{const _=await x.loadAsync("audio/hpbd.mp3");R.setBuffer(_),R.setVolume(0),R.setLoop(!0)}catch(_){console.warn("Failed to load hpbd.mp3:",_)}const M=Ds(t);M.setCandlePosition(p);const B=xa(t),S=Es(t),v=Cs(t),K=Ps(t),L=Ls(t),j=Ns(t),H=Os(t),C=ks(t),N=Us(t,p),V=_s(i);let D=!0,F=!1,Z=Math.PI*.15;const W=new Ut,q=[];V.onReady(async()=>{D=!1;try{T.buffer&&T.play()}catch(J){console.warn("Could not play fr.wav immediately:",J)}const _=document.getElementById("ready-btn"),G=_?.closest(".ui-card"),z=G?.querySelector(".ui-heading"),oe=G?.querySelector(".ui-eyebrow"),be=G?.querySelector(".ui-hint"),ce=_?.querySelector(".btn-label"),Ee=_?.querySelector(".btn-radial"),Ce=_?.querySelectorAll(".sparkle");oe&&P.to(oe,{opacity:0,duration:.3,ease:"power2.out"}),z&&P.to(z,{opacity:0,duration:.3,ease:"power2.out"}),be&&P.to(be,{opacity:0,duration:.3,ease:"power2.out"}),Ce&&Ce.forEach(J=>P.to(J,{opacity:0,duration:.2})),await new Promise(J=>setTimeout(J,300)),ce&&(P.to(ce,{letterSpacing:"0em",scale:.3,duration:.3,ease:"power2.in"}),P.to(ce,{color:"rgb(255, 150, 50)",duration:.2,ease:"power2.in"}),P.to(ce,{color:"rgb(255, 220, 80)",duration:.2,delay:.2,ease:"power2.in"}),P.to(ce,{opacity:0,duration:.2,delay:.4,ease:"power2.in"})),await new Promise(J=>setTimeout(J,500));const ye=new E;e.getWorldDirection(ye);const le=new E;le.copy(e.position).addScaledVector(ye,4),le.y+=.2;const Re=new E().copy(p).sub(le).normalize();S.activate(le,Re),S.setScale(2),S.mesh.material.color.setHex(16729088),S.light.color.setHex(16729088),S.light.intensity=4,P.to(S.mesh.scale,{x:3,y:3,z:3,duration:.15,ease:"power2.out",onComplete:()=>{P.to(S.mesh.scale,{x:1,y:1,z:1,duration:.2,ease:"power2.in"})}}),S.setColor(16746496,.15),setTimeout(()=>S.setColor(16768324,.2),150),_&&P.to(_,{opacity:0,scale:.5,duration:.3,ease:"power2.in",onComplete:()=>{_.style.display="none"}}),Ee&&P.to(Ee,{opacity:0,duration:.2}),P.to(document.getElementById("ui-overlay"),{opacity:0,duration:.3,ease:"power2.in",onComplete:()=>{const J=document.getElementById("ui-overlay");J&&(J.style.pointerEvents="none",J.style.display="none")}}),await new Promise(J=>setTimeout(J,350)),Bs({scene:t,camera:e,controls:o,bloomPass:a,spark:S,dust:v,confetti:K,bokeh:L,env:M,flash:j,energyWave:H,birthdayText:C,candleFlame:N,candlePosition:p,restoreOriginalMaterials:g,explosionUpdaters:q,frDuration:y,onRevealComplete:()=>{if(B.reveal(),R.buffer){let Te=function(){const fe=performance.now()-J,ue=Math.min(fe/Ne,1);R.setVolume(ue*.3),ue<1&&requestAnimationFrame(Te)};R.play();const J=performance.now(),Ne=1e3;Te()}},enableOrbit:()=>{F=!0,o.target.set(0,1.8,0),Uo(o),V.showInteractiveHints()}})});function I(){requestAnimationFrame(I);const _=Math.min(W.getDelta(),.05),G=W.elapsedTime;if(D){Z+=.003;const z=8.5;e.position.x=Math.sin(Z)*z,e.position.z=Math.cos(Z)*z,e.position.y=3.5+Math.sin(G*.3)*.3,e.lookAt(0,1.5,0),h.rotation.y+=.003}S.update(G),S.updateParticles(_||.016,G),v.update(),K.update(),L.update(G);for(let z=q.length-1;z>=0;z--){const oe=q[z];oe.update(),oe.isDisposed()&&q.splice(z,1)}if(D||(M.updateCandleFlicker(G),M.updateBalloons(G),B.update(G)),C.update(G,e),N.update(G),F&&o.update(),c){const z=e.position.distanceTo(new E(0,1.5,0));c.uniforms.focus.value=z}s.render()}I()}wa();
