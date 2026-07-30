import{M as F,O as sn,B as De,F as Ft,S as he,U as at,V as W,W as Ze,H as Je,N as on,C as Rt,a as Z,b as E,A as et,c as se,d as Tt,e as Mn,R as En,f as Cn,g as Sn,h as Rn,P as Pn,i as Dn,j as Pe,E as Ln,k as Fe,T as Ue,l as Ut,Q as ct,m as _n,n as In,o as rn,p as an,q as Nn,r as wt,s as cn,L as On,t as $e,u as ln,v as ae,w as pe,x as Fn,y as lt,D as vt,I as At,z as ut,G as Un,J as Pt,K as kn,X as Hn,Y as oe,Z as Bn,_ as un,$ as zn,a0 as Gn,a1 as jn,a2 as dt,a3 as Mt,a4 as Kn,a5 as Vn,a6 as Dt,a7 as mt,a8 as dn,a9 as q,aa as tt,ab as Wn,ac as Yn,ad as Xn,ae as fn,af as Qn,ag as nt,ah as be,ai as qn,aj as Zn,ak as Jn,al as $n,am as hn,an as es,ao as kt,ap as Ht,aq as Bt,ar as zt,as as Gt,at as ts,au as ns,av as He,aw as ss,ax as ft,ay as ht,az as pt,aA as pn,aB as os,aC as rs,aD as is,aE as ee,aF as as,aG as ke,aH as Et,aI as jt,aJ as cs,aK as ls,aL as Kt,aM as us,aN as ds,aO as fs,aP as Vt}from"./three-BlKKYonh.js";import{g as S}from"./gsap-SFc2wnMY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const mn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ge{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const hs=new sn(-1,1,1,-1,0,1);class ps extends De{constructor(){super(),this.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ft([0,2,0,0,2,0],2))}}const ms=new ps;class Lt{constructor(t){this._mesh=new F(ms,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,hs)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class gn extends Ge{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof he?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=at.clone(t.uniforms),this.material=new he({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Lt(this.material)}render(t,n,e){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=e.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Wt extends Ge{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,e){const s=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(s.EQUAL,1,4294967295),o.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.buffers.stencil.setLocked(!0)}}class gs extends Ge{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class xs{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const e=t.getSize(new W);this._width=e.width,this._height=e.height,n=new Ze(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Je}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gn(mn),this.copyPass.material.blending=on,this.clock=new Rt}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let e=!1;for(let s=0,o=this.passes.length;s<o;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,e),r.needsSwap){if(e){const a=this.renderer.getContext(),i=this.renderer.state.buffers.stencil;i.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),i.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Wt!==void 0&&(r instanceof Wt?e=!0:r instanceof gs&&(e=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new W);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const e=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(e,s),this.renderTarget2.setSize(e,s);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(e,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class bs extends Ge{constructor(t,n,e=null,s=null,o=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=e,this.clearColor=s,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Z}render(t,n,e){const s=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:e),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const ys={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Z(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ze extends Ge{constructor(t,n,e,s){super(),this.strength=n!==void 0?n:1,this.radius=e,this.threshold=s,this.resolution=t!==void 0?new W(t.x,t.y):new W(256,256),this.clearColor=new Z(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Ze(o,r,{type:Je}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new Ze(o,r,{type:Je});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new Ze(o,r,{type:Je});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),o=Math.round(o/2),r=Math.round(r/2)}const a=ys;this.highPassUniforms=at.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new he({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const i=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(i[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new W(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const d=mn;this.copyUniforms=at.clone(d.uniforms),this.blendMaterial=new he({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:et,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Z,this.oldClearAlpha=1,this.basic=new se,this.fsQuad=new Lt(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,n){let e=Math.round(t/2),s=Math.round(n/2);this.renderTargetBright.setSize(e,s);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(e,s),this.renderTargetsVertical[o].setSize(e,s),this.separableBlurMaterials[o].uniforms.invSize.value=new W(1/e,1/s),e=Math.round(e/2),s=Math.round(s/2)}render(t,n,e,s,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=e.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=e.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let i=0;i<this.nMips;i++)this.fsQuad.material=this.separableBlurMaterials[i],this.separableBlurMaterials[i].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[i].uniforms.direction.value=ze.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[i]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[i].uniforms.colorTexture.value=this.renderTargetsHorizontal[i].texture,this.separableBlurMaterials[i].uniforms.direction.value=ze.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[i]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[i];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const n=[];for(let e=0;e<t;e++)n.push(.39894*Math.exp(-.5*e*e/(t*t))/t);return new he({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new W(.5,.5)},direction:{value:new W(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new he({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ze.BlurDirectionX=new W(1,0);ze.BlurDirectionY=new W(0,1);const Ts={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new W(1/1024,1/512)}},vertexShader:`

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
	`},ws={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

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

		}`};class vs extends Ge{constructor(t,n,e){super(),this.scene=t,this.camera=n;const s=e.focus!==void 0?e.focus:1,o=e.aperture!==void 0?e.aperture:.025,r=e.maxblur!==void 0?e.maxblur:1;this.renderTargetDepth=new Ze(1,1,{minFilter:Tt,magFilter:Tt,type:Je}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new Mn,this.materialDepth.depthPacking=En,this.materialDepth.blending=on;const a=ws,i=at.clone(a.uniforms);i.tDepth.value=this.renderTargetDepth.texture,i.focus.value=s,i.aspect.value=n.aspect,i.aperture.value=o,i.maxblur.value=r,i.nearClip.value=n.near,i.farClip.value=n.far,this.materialBokeh=new he({defines:Object.assign({},a.defines),uniforms:i,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.uniforms=i,this.fsQuad=new Lt(this.materialBokeh),this._oldClearColor=new Z}render(t,n,e){this.scene.overrideMaterial=this.materialDepth,t.getClearColor(this._oldClearColor);const s=t.getClearAlpha(),o=t.autoClear;t.autoClear=!1,t.setClearColor(16777215),t.setClearAlpha(1),t.setRenderTarget(this.renderTargetDepth),t.clear(),t.render(this.scene,this.camera),this.uniforms.tColor.value=e.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),t.clear(),this.fsQuad.render(t)),this.scene.overrideMaterial=null,t.setClearColor(this._oldClearColor),t.setClearAlpha(s),t.autoClear=o}setSize(t,n){this.materialBokeh.uniforms.aspect.value=t/n,this.renderTargetDepth.setSize(t,n)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}function As(f){const t=new Cn;t.background=new Z(0),t.fog=new Sn(0,.04);const n=new Rn({antialias:!1,powerPreference:"high-performance",alpha:!1});n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(window.innerWidth,window.innerHeight),n.shadowMap.enabled=!0,n.shadowMap.type=Pn,n.toneMapping=Dn,n.toneMappingExposure=.85,n.outputColorSpace=Pe,f.appendChild(n.domElement);const e=new Rt;return{scene:t,renderer:n,clock:e}}function Ms(f,t,n){const e=window.innerWidth,s=window.innerHeight,o=f.getPixelRatio(),r=new xs(f),a=new bs(t,n);r.addPass(a);const i=new vs(t,n,{focus:11,aperture:1e-4,maxblur:.008,width:e,height:s});r.addPass(i);const c=new ze(new W(e,s),1.4,.5,.25);r.addPass(c);const d=new gn(Ts);return d.material.uniforms.resolution.value.set(1/(e*o),1/(s*o)),r.addPass(d),window.addEventListener("resize",()=>{const u=window.innerWidth,h=window.innerHeight,p=f.getPixelRatio();f.setSize(u,h),r.setSize(u,h),c.resolution.set(u,h),d.material.uniforms.resolution.value.set(1/(u*p),1/(h*p)),n.aspect=u/h,n.updateProjectionMatrix()}),{composer:r,bloomPass:c,bokehPass:i,fxaaPass:d}}const Yt={type:"change"},gt={type:"start"},Xt={type:"end"},it=new _n,Qt=new In,Es=Math.cos(70*rn.DEG2RAD);class Cs extends Ln{constructor(t,n){super(),this.object=t,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fe.ROTATE,MIDDLE:Fe.DOLLY,RIGHT:Fe.PAN},this.touches={ONE:Ue.ROTATE,TWO:Ue.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(l){l.addEventListener("keydown",Se),this._domElementKeyEvents=l},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Se),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(Yt),e.update(),o=s.NONE},this.update=function(){const l=new E,T=new ct().setFromUnitVectors(t.up,new E(0,1,0)),O=T.clone().invert(),V=new E,J=new ct,ge=new E,$=2*Math.PI;return function(An=null){const Nt=e.object.position;l.copy(Nt).sub(e.target),l.applyQuaternion(T),a.setFromVector3(l),e.autoRotate&&o===s.NONE&&C(k(An)),e.enableDamping?(a.theta+=i.theta*e.dampingFactor,a.phi+=i.phi*e.dampingFactor):(a.theta+=i.theta,a.phi+=i.phi);let le=e.minAzimuthAngle,ue=e.maxAzimuthAngle;isFinite(le)&&isFinite(ue)&&(le<-Math.PI?le+=$:le>Math.PI&&(le-=$),ue<-Math.PI?ue+=$:ue>Math.PI&&(ue-=$),le<=ue?a.theta=Math.max(le,Math.min(ue,a.theta)):a.theta=a.theta>(le+ue)/2?Math.max(le,a.theta):Math.min(ue,a.theta)),a.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,a.phi)),a.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(d,e.dampingFactor):e.target.add(d),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor);let Xe=!1;if(e.zoomToCursor&&M||e.object.isOrthographicCamera)a.radius=A(a.radius);else{const de=a.radius;a.radius=A(a.radius*c),Xe=de!=a.radius}if(l.setFromSpherical(a),l.applyQuaternion(O),Nt.copy(e.target).add(l),e.object.lookAt(e.target),e.enableDamping===!0?(i.theta*=1-e.dampingFactor,i.phi*=1-e.dampingFactor,d.multiplyScalar(1-e.dampingFactor)):(i.set(0,0,0),d.set(0,0,0)),e.zoomToCursor&&M){let de=null;if(e.object.isPerspectiveCamera){const Qe=l.length();de=A(Qe*c);const rt=Qe-de;e.object.position.addScaledVector(v,rt),e.object.updateMatrixWorld(),Xe=!!rt}else if(e.object.isOrthographicCamera){const Qe=new E(P.x,P.y,0);Qe.unproject(e.object);const rt=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/c)),e.object.updateProjectionMatrix(),Xe=rt!==e.object.zoom;const Ot=new E(P.x,P.y,0);Ot.unproject(e.object),e.object.position.sub(Ot).add(Qe),e.object.updateMatrixWorld(),de=l.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;de!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(de).add(e.object.position):(it.origin.copy(e.object.position),it.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(it.direction))<Es?t.lookAt(e.target):(Qt.setFromNormalAndCoplanarPoint(e.object.up,e.target),it.intersectPlane(Qt,e.target))))}else if(e.object.isOrthographicCamera){const de=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/c)),de!==e.object.zoom&&(e.object.updateProjectionMatrix(),Xe=!0)}return c=1,M=!1,Xe||V.distanceToSquared(e.object.position)>r||8*(1-J.dot(e.object.quaternion))>r||ge.distanceToSquared(e.target)>r?(e.dispatchEvent(Yt),V.copy(e.object.position),J.copy(e.object.quaternion),ge.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",_t),e.domElement.removeEventListener("pointerdown",Ce),e.domElement.removeEventListener("pointercancel",me),e.domElement.removeEventListener("wheel",ot),e.domElement.removeEventListener("pointermove",Ie),e.domElement.removeEventListener("pointerup",me),e.domElement.getRootNode().removeEventListener("keydown",We,{capture:!0}),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",Se),e._domElementKeyEvents=null)};const e=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const r=1e-6,a=new Ut,i=new Ut;let c=1;const d=new E,u=new W,h=new W,p=new W,g=new W,x=new W,m=new W,y=new W,w=new W,R=new W,v=new E,P=new W;let M=!1;const b=[],z={};let D=!1;function k(l){return l!==null?2*Math.PI/60*e.autoRotateSpeed*l:2*Math.PI/60/60*e.autoRotateSpeed}function U(l){const T=Math.abs(l*.01);return Math.pow(.95,e.zoomSpeed*T)}function C(l){i.theta-=l}function _(l){i.phi-=l}const H=function(){const l=new E;return function(O,V){l.setFromMatrixColumn(V,0),l.multiplyScalar(-O),d.add(l)}}(),L=function(){const l=new E;return function(O,V){e.screenSpacePanning===!0?l.setFromMatrixColumn(V,1):(l.setFromMatrixColumn(V,0),l.crossVectors(e.object.up,l)),l.multiplyScalar(O),d.add(l)}}(),N=function(){const l=new E;return function(O,V){const J=e.domElement;if(e.object.isPerspectiveCamera){const ge=e.object.position;l.copy(ge).sub(e.target);let $=l.length();$*=Math.tan(e.object.fov/2*Math.PI/180),H(2*O*$/J.clientHeight,e.object.matrix),L(2*V*$/J.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(H(O*(e.object.right-e.object.left)/e.object.zoom/J.clientWidth,e.object.matrix),L(V*(e.object.top-e.object.bottom)/e.object.zoom/J.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function X(l){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?c/=l:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function G(l){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?c*=l:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Q(l,T){if(!e.zoomToCursor)return;M=!0;const O=e.domElement.getBoundingClientRect(),V=l-O.left,J=T-O.top,ge=O.width,$=O.height;P.x=V/ge*2-1,P.y=-(J/$)*2+1,v.set(P.x,P.y,1).unproject(e.object).sub(e.object.position).normalize()}function A(l){return Math.max(e.minDistance,Math.min(e.maxDistance,l))}function B(l){u.set(l.clientX,l.clientY)}function j(l){Q(l.clientX,l.clientX),y.set(l.clientX,l.clientY)}function K(l){g.set(l.clientX,l.clientY)}function ce(l){h.set(l.clientX,l.clientY),p.subVectors(h,u).multiplyScalar(e.rotateSpeed);const T=e.domElement;C(2*Math.PI*p.x/T.clientHeight),_(2*Math.PI*p.y/T.clientHeight),u.copy(h),e.update()}function ne(l){w.set(l.clientX,l.clientY),R.subVectors(w,y),R.y>0?X(U(R.y)):R.y<0&&G(U(R.y)),y.copy(w),e.update()}function ye(l){x.set(l.clientX,l.clientY),m.subVectors(x,g).multiplyScalar(e.panSpeed),N(m.x,m.y),g.copy(x),e.update()}function Te(l){Q(l.clientX,l.clientY),l.deltaY<0?G(U(l.deltaY)):l.deltaY>0&&X(U(l.deltaY)),e.update()}function we(l){let T=!1;switch(l.code){case e.keys.UP:l.ctrlKey||l.metaKey||l.shiftKey?_(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(0,e.keyPanSpeed),T=!0;break;case e.keys.BOTTOM:l.ctrlKey||l.metaKey||l.shiftKey?_(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(0,-e.keyPanSpeed),T=!0;break;case e.keys.LEFT:l.ctrlKey||l.metaKey||l.shiftKey?C(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(e.keyPanSpeed,0),T=!0;break;case e.keys.RIGHT:l.ctrlKey||l.metaKey||l.shiftKey?C(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(-e.keyPanSpeed,0),T=!0;break}T&&(l.preventDefault(),e.update())}function re(l){if(b.length===1)u.set(l.pageX,l.pageY);else{const T=Oe(l),O=.5*(l.pageX+T.x),V=.5*(l.pageY+T.y);u.set(O,V)}}function ve(l){if(b.length===1)g.set(l.pageX,l.pageY);else{const T=Oe(l),O=.5*(l.pageX+T.x),V=.5*(l.pageY+T.y);g.set(O,V)}}function Y(l){const T=Oe(l),O=l.pageX-T.x,V=l.pageY-T.y,J=Math.sqrt(O*O+V*V);y.set(0,J)}function Le(l){e.enableZoom&&Y(l),e.enablePan&&ve(l)}function Ae(l){e.enableZoom&&Y(l),e.enableRotate&&re(l)}function Me(l){if(b.length==1)h.set(l.pageX,l.pageY);else{const O=Oe(l),V=.5*(l.pageX+O.x),J=.5*(l.pageY+O.y);h.set(V,J)}p.subVectors(h,u).multiplyScalar(e.rotateSpeed);const T=e.domElement;C(2*Math.PI*p.x/T.clientHeight),_(2*Math.PI*p.y/T.clientHeight),u.copy(h)}function ie(l){if(b.length===1)x.set(l.pageX,l.pageY);else{const T=Oe(l),O=.5*(l.pageX+T.x),V=.5*(l.pageY+T.y);x.set(O,V)}m.subVectors(x,g).multiplyScalar(e.panSpeed),N(m.x,m.y),g.copy(x)}function Ee(l){const T=Oe(l),O=l.pageX-T.x,V=l.pageY-T.y,J=Math.sqrt(O*O+V*V);w.set(0,J),R.set(0,Math.pow(w.y/y.y,e.zoomSpeed)),X(R.y),y.copy(w);const ge=(l.pageX+T.x)*.5,$=(l.pageY+T.y)*.5;Q(ge,$)}function st(l){e.enableZoom&&Ee(l),e.enablePan&&ie(l)}function _e(l){e.enableZoom&&Ee(l),e.enableRotate&&Me(l)}function Ce(l){e.enabled!==!1&&(b.length===0&&(e.domElement.setPointerCapture(l.pointerId),e.domElement.addEventListener("pointermove",Ie),e.domElement.addEventListener("pointerup",me)),!vn(l)&&(Tn(l),l.pointerType==="touch"?Ye(l):je(l)))}function Ie(l){e.enabled!==!1&&(l.pointerType==="touch"?yn(l):Ke(l))}function me(l){switch(wn(l),b.length){case 0:e.domElement.releasePointerCapture(l.pointerId),e.domElement.removeEventListener("pointermove",Ie),e.domElement.removeEventListener("pointerup",me),e.dispatchEvent(Xt),o=s.NONE;break;case 1:const T=b[0],O=z[T];Ye({pointerId:T,pageX:O.x,pageY:O.y});break}}function je(l){let T;switch(l.button){case 0:T=e.mouseButtons.LEFT;break;case 1:T=e.mouseButtons.MIDDLE;break;case 2:T=e.mouseButtons.RIGHT;break;default:T=-1}switch(T){case Fe.DOLLY:if(e.enableZoom===!1)return;j(l),o=s.DOLLY;break;case Fe.ROTATE:if(l.ctrlKey||l.metaKey||l.shiftKey){if(e.enablePan===!1)return;K(l),o=s.PAN}else{if(e.enableRotate===!1)return;B(l),o=s.ROTATE}break;case Fe.PAN:if(l.ctrlKey||l.metaKey||l.shiftKey){if(e.enableRotate===!1)return;B(l),o=s.ROTATE}else{if(e.enablePan===!1)return;K(l),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&e.dispatchEvent(gt)}function Ke(l){switch(o){case s.ROTATE:if(e.enableRotate===!1)return;ce(l);break;case s.DOLLY:if(e.enableZoom===!1)return;ne(l);break;case s.PAN:if(e.enablePan===!1)return;ye(l);break}}function ot(l){e.enabled===!1||e.enableZoom===!1||o!==s.NONE||(l.preventDefault(),e.dispatchEvent(gt),Te(Ve(l)),e.dispatchEvent(Xt))}function Ve(l){const T=l.deltaMode,O={clientX:l.clientX,clientY:l.clientY,deltaY:l.deltaY};switch(T){case 1:O.deltaY*=16;break;case 2:O.deltaY*=100;break}return l.ctrlKey&&!D&&(O.deltaY*=10),O}function We(l){l.key==="Control"&&(D=!0,e.domElement.getRootNode().addEventListener("keyup",Ne,{passive:!0,capture:!0}))}function Ne(l){l.key==="Control"&&(D=!1,e.domElement.getRootNode().removeEventListener("keyup",Ne,{passive:!0,capture:!0}))}function Se(l){e.enabled===!1||e.enablePan===!1||we(l)}function Ye(l){switch(It(l),b.length){case 1:switch(e.touches.ONE){case Ue.ROTATE:if(e.enableRotate===!1)return;re(l),o=s.TOUCH_ROTATE;break;case Ue.PAN:if(e.enablePan===!1)return;ve(l),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(e.touches.TWO){case Ue.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Le(l),o=s.TOUCH_DOLLY_PAN;break;case Ue.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ae(l),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&e.dispatchEvent(gt)}function yn(l){switch(It(l),o){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;Me(l),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;ie(l),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;st(l),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;_e(l),e.update();break;default:o=s.NONE}}function _t(l){e.enabled!==!1&&l.preventDefault()}function Tn(l){b.push(l.pointerId)}function wn(l){delete z[l.pointerId];for(let T=0;T<b.length;T++)if(b[T]==l.pointerId){b.splice(T,1);return}}function vn(l){for(let T=0;T<b.length;T++)if(b[T]==l.pointerId)return!0;return!1}function It(l){let T=z[l.pointerId];T===void 0&&(T=new W,z[l.pointerId]=T),T.set(l.pageX,l.pageY)}function Oe(l){const T=l.pointerId===b[0]?b[1]:b[0];return z[T]}e.domElement.addEventListener("contextmenu",_t),e.domElement.addEventListener("pointerdown",Ce),e.domElement.addEventListener("pointercancel",me),e.domElement.addEventListener("wheel",ot,{passive:!1}),e.domElement.getRootNode().addEventListener("keydown",We,{passive:!0,capture:!0}),this.update()}}function Ss(f){const t=new an(55,window.innerWidth/window.innerHeight,.01,200);t.position.set(0,3.5,9),t.lookAt(0,1.5,0);const n=new Cs(t,f.domElement);return n.enabled=!1,n.enableDamping=!0,n.dampingFactor=.06,n.enablePan=!1,n.minDistance=3,n.maxDistance=18,n.maxPolarAngle=Math.PI/2-.02,n.target.set(0,1.5,0),{camera:t,controls:n}}function Rs(f){f.enabled=!0}function qt(f,t){if(t===Nn)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),f;if(t===wt||t===cn){let n=f.getIndex();if(n===null){const r=[],a=f.getAttribute("position");if(a!==void 0){for(let i=0;i<a.count;i++)r.push(i);f.setIndex(r),n=f.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),f}const e=n.count-2,s=[];if(t===wt)for(let r=1;r<=e;r++)s.push(n.getX(0)),s.push(n.getX(r)),s.push(n.getX(r+1));else for(let r=0;r<e;r++)r%2===0?(s.push(n.getX(r)),s.push(n.getX(r+1)),s.push(n.getX(r+2))):(s.push(n.getX(r+2)),s.push(n.getX(r+1)),s.push(n.getX(r)));s.length/3!==e&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=f.clone();return o.setIndex(s),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),f}class Ps extends On{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(n){return new Ns(n)}),this.register(function(n){return new Os(n)}),this.register(function(n){return new Ks(n)}),this.register(function(n){return new Vs(n)}),this.register(function(n){return new Ws(n)}),this.register(function(n){return new Us(n)}),this.register(function(n){return new ks(n)}),this.register(function(n){return new Hs(n)}),this.register(function(n){return new Bs(n)}),this.register(function(n){return new Is(n)}),this.register(function(n){return new zs(n)}),this.register(function(n){return new Fs(n)}),this.register(function(n){return new js(n)}),this.register(function(n){return new Gs(n)}),this.register(function(n){return new Ls(n)}),this.register(function(n){return new Ys(n)}),this.register(function(n){return new Xs(n)})}load(t,n,e,s){const o=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=$e.extractUrlBase(t);r=$e.resolveURL(c,this.path)}else r=$e.extractUrlBase(t);this.manager.itemStart(t);const a=function(c){s?s(c):console.error(c),o.manager.itemError(t),o.manager.itemEnd(t)},i=new ln(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(t,function(c){try{o.parse(c,r,function(d){n(d),o.manager.itemEnd(t)},a)}catch(d){a(d)}},e,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,n,e,s){let o;const r={},a={},i=new TextDecoder;if(typeof t=="string")o=JSON.parse(t);else if(t instanceof ArrayBuffer)if(i.decode(new Uint8Array(t,0,4))===xn){try{r[I.KHR_BINARY_GLTF]=new Qs(t)}catch(u){s&&s(u);return}o=JSON.parse(r[I.KHR_BINARY_GLTF].content)}else o=JSON.parse(i.decode(t));else o=t;if(o.asset===void 0||o.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new co(o,{path:n||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,r[u.name]=!0}if(o.extensionsUsed)for(let d=0;d<o.extensionsUsed.length;++d){const u=o.extensionsUsed[d],h=o.extensionsRequired||[];switch(u){case I.KHR_MATERIALS_UNLIT:r[u]=new _s;break;case I.KHR_DRACO_MESH_COMPRESSION:r[u]=new qs(o,this.dracoLoader);break;case I.KHR_TEXTURE_TRANSFORM:r[u]=new Zs;break;case I.KHR_MESH_QUANTIZATION:r[u]=new Js;break;default:h.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(a),c.parse(e,s)}parseAsync(t,n){const e=this;return new Promise(function(s,o){e.parse(t,n,s,o)})}}function Ds(){let f={};return{get:function(t){return f[t]},add:function(t,n){f[t]=n},remove:function(t){delete f[t]},removeAll:function(){f={}}}}const I={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ls{constructor(t){this.parser=t,this.name=I.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,n=this.parser.json.nodes||[];for(let e=0,s=n.length;e<s;e++){const o=n[e];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(t){const n=this.parser,e="light:"+t;let s=n.cache.get(e);if(s)return s;const o=n.json,i=((o.extensions&&o.extensions[this.name]||{}).lights||[])[t];let c;const d=new Z(16777215);i.color!==void 0&&d.setRGB(i.color[0],i.color[1],i.color[2],pe);const u=i.range!==void 0?i.range:0;switch(i.type){case"directional":c=new vt(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new lt(d),c.distance=u;break;case"spot":c=new Fn(d),c.distance=u,i.spot=i.spot||{},i.spot.innerConeAngle=i.spot.innerConeAngle!==void 0?i.spot.innerConeAngle:0,i.spot.outerConeAngle=i.spot.outerConeAngle!==void 0?i.spot.outerConeAngle:Math.PI/4,c.angle=i.spot.outerConeAngle,c.penumbra=1-i.spot.innerConeAngle/i.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+i.type)}return c.position.set(0,0,0),c.decay=2,fe(c,i),i.intensity!==void 0&&(c.intensity=i.intensity),c.name=n.createUniqueName(i.name||"light_"+t),s=Promise.resolve(c),n.cache.add(e,s),s}getDependency(t,n){if(t==="light")return this._loadLight(n)}createNodeAttachment(t){const n=this,e=this.parser,o=e.json.nodes[t],a=(o.extensions&&o.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(i){return e._getNodeRef(n.cache,a,i)})}}class _s{constructor(){this.name=I.KHR_MATERIALS_UNLIT}getMaterialType(){return se}extendParams(t,n,e){const s=[];t.color=new Z(1,1,1),t.opacity=1;const o=n.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const r=o.baseColorFactor;t.color.setRGB(r[0],r[1],r[2],pe),t.opacity=r[3]}o.baseColorTexture!==void 0&&s.push(e.assignTexture(t,"map",o.baseColorTexture,Pe))}return Promise.all(s)}}class Is{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,n){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=s.extensions[this.name].emissiveStrength;return o!==void 0&&(n.emissiveIntensity=o),Promise.resolve()}}class Ns{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];if(r.clearcoatFactor!==void 0&&(n.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&o.push(e.assignTexture(n,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(n.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&o.push(e.assignTexture(n,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(o.push(e.assignTexture(n,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const a=r.clearcoatNormalTexture.scale;n.clearcoatNormalScale=new W(a,a)}return Promise.all(o)}}class Os{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_DISPERSION}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=s.extensions[this.name];return n.dispersion=o.dispersion!==void 0?o.dispersion:0,Promise.resolve()}}class Fs{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];return r.iridescenceFactor!==void 0&&(n.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&o.push(e.assignTexture(n,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(n.iridescenceIOR=r.iridescenceIor),n.iridescenceThicknessRange===void 0&&(n.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&o.push(e.assignTexture(n,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(o)}}class Us{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_SHEEN}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[];n.sheenColor=new Z(0,0,0),n.sheenRoughness=0,n.sheen=1;const r=s.extensions[this.name];if(r.sheenColorFactor!==void 0){const a=r.sheenColorFactor;n.sheenColor.setRGB(a[0],a[1],a[2],pe)}return r.sheenRoughnessFactor!==void 0&&(n.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&o.push(e.assignTexture(n,"sheenColorMap",r.sheenColorTexture,Pe)),r.sheenRoughnessTexture!==void 0&&o.push(e.assignTexture(n,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(o)}}class ks{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];return r.transmissionFactor!==void 0&&(n.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&o.push(e.assignTexture(n,"transmissionMap",r.transmissionTexture)),Promise.all(o)}}class Hs{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_VOLUME}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];n.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&o.push(e.assignTexture(n,"thicknessMap",r.thicknessTexture)),n.attenuationDistance=r.attenuationDistance||1/0;const a=r.attenuationColor||[1,1,1];return n.attenuationColor=new Z().setRGB(a[0],a[1],a[2],pe),Promise.all(o)}}class Bs{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_IOR}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const s=this.parser.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=s.extensions[this.name];return n.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class zs{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_SPECULAR}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];n.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&o.push(e.assignTexture(n,"specularIntensityMap",r.specularTexture));const a=r.specularColorFactor||[1,1,1];return n.specularColor=new Z().setRGB(a[0],a[1],a[2],pe),r.specularColorTexture!==void 0&&o.push(e.assignTexture(n,"specularColorMap",r.specularColorTexture,Pe)),Promise.all(o)}}class Gs{constructor(t){this.parser=t,this.name=I.EXT_MATERIALS_BUMP}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];return n.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&o.push(e.assignTexture(n,"bumpMap",r.bumpTexture)),Promise.all(o)}}class js{constructor(t){this.parser=t,this.name=I.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const e=this.parser.json.materials[t];return!e.extensions||!e.extensions[this.name]?null:ae}extendMaterialParams(t,n){const e=this.parser,s=e.json.materials[t];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const o=[],r=s.extensions[this.name];return r.anisotropyStrength!==void 0&&(n.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(n.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&o.push(e.assignTexture(n,"anisotropyMap",r.anisotropyTexture)),Promise.all(o)}}class Ks{constructor(t){this.parser=t,this.name=I.KHR_TEXTURE_BASISU}loadTexture(t){const n=this.parser,e=n.json,s=e.textures[t];if(!s.extensions||!s.extensions[this.name])return null;const o=s.extensions[this.name],r=n.options.ktx2Loader;if(!r){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return n.loadTextureImage(t,o.source,r)}}class Vs{constructor(t){this.parser=t,this.name=I.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const n=this.name,e=this.parser,s=e.json,o=s.textures[t];if(!o.extensions||!o.extensions[n])return null;const r=o.extensions[n],a=s.images[r.source];let i=e.textureLoader;if(a.uri){const c=e.options.manager.getHandler(a.uri);c!==null&&(i=c)}return this.detectSupport().then(function(c){if(c)return e.loadTextureImage(t,r.source,i);if(s.extensionsRequired&&s.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return e.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const n=new Image;n.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",n.onload=n.onerror=function(){t(n.height===1)}})),this.isSupported}}class Ws{constructor(t){this.parser=t,this.name=I.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const n=this.name,e=this.parser,s=e.json,o=s.textures[t];if(!o.extensions||!o.extensions[n])return null;const r=o.extensions[n],a=s.images[r.source];let i=e.textureLoader;if(a.uri){const c=e.options.manager.getHandler(a.uri);c!==null&&(i=c)}return this.detectSupport().then(function(c){if(c)return e.loadTextureImage(t,r.source,i);if(s.extensionsRequired&&s.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return e.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const n=new Image;n.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",n.onload=n.onerror=function(){t(n.height===1)}})),this.isSupported}}class Ys{constructor(t){this.name=I.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const n=this.parser.json,e=n.bufferViews[t];if(e.extensions&&e.extensions[this.name]){const s=e.extensions[this.name],o=this.parser.getDependency("buffer",s.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(a){const i=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,h=new Uint8Array(a,i,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(d,u,h,s.mode,s.filter).then(function(p){return p.buffer}):r.ready.then(function(){const p=new ArrayBuffer(d*u);return r.decodeGltfBuffer(new Uint8Array(p),d,u,h,s.mode,s.filter),p})})}else return null}}class Xs{constructor(t){this.name=I.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const n=this.parser.json,e=n.nodes[t];if(!e.extensions||!e.extensions[this.name]||e.mesh===void 0)return null;const s=n.meshes[e.mesh];for(const c of s.primitives)if(c.mode!==te.TRIANGLES&&c.mode!==te.TRIANGLE_STRIP&&c.mode!==te.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=e.extensions[this.name].attributes,a=[],i={};for(const c in r)a.push(this.parser.getDependency("accessor",r[c]).then(d=>(i[c]=d,i[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(c=>{const d=c.pop(),u=d.isGroup?d.children:[d],h=c[0].count,p=[];for(const g of u){const x=new ut,m=new E,y=new ct,w=new E(1,1,1),R=new At(g.geometry,g.material,h);for(let v=0;v<h;v++)i.TRANSLATION&&m.fromBufferAttribute(i.TRANSLATION,v),i.ROTATION&&y.fromBufferAttribute(i.ROTATION,v),i.SCALE&&w.fromBufferAttribute(i.SCALE,v),R.setMatrixAt(v,x.compose(m,y,w));for(const v in i)if(v==="_COLOR_0"){const P=i[v];R.instanceColor=new Un(P.array,P.itemSize,P.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,i[v]);Pt.prototype.copy.call(R,g),this.parser.assignFinalMaterial(R),p.push(R)}return d.isGroup?(d.clear(),d.add(...p),d):p[0]}))}}const xn="glTF",qe=12,Zt={JSON:1313821514,BIN:5130562};class Qs{constructor(t){this.name=I.KHR_BINARY_GLTF,this.content=null,this.body=null;const n=new DataView(t,0,qe),e=new TextDecoder;if(this.header={magic:e.decode(new Uint8Array(t.slice(0,4))),version:n.getUint32(4,!0),length:n.getUint32(8,!0)},this.header.magic!==xn)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-qe,o=new DataView(t,qe);let r=0;for(;r<s;){const a=o.getUint32(r,!0);r+=4;const i=o.getUint32(r,!0);if(r+=4,i===Zt.JSON){const c=new Uint8Array(t,qe+r,a);this.content=e.decode(c)}else if(i===Zt.BIN){const c=qe+r;this.body=t.slice(c,c+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class qs{constructor(t,n){if(!n)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=I.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=n,this.dracoLoader.preload()}decodePrimitive(t,n){const e=this.json,s=this.dracoLoader,o=t.extensions[this.name].bufferView,r=t.extensions[this.name].attributes,a={},i={},c={};for(const d in r){const u=Ct[d]||d.toLowerCase();a[u]=r[d]}for(const d in t.attributes){const u=Ct[d]||d.toLowerCase();if(r[d]!==void 0){const h=e.accessors[t.attributes[d]],p=Be[h.componentType];c[u]=p.name,i[u]=h.normalized===!0}}return n.getDependency("bufferView",o).then(function(d){return new Promise(function(u,h){s.decodeDracoFile(d,function(p){for(const g in p.attributes){const x=p.attributes[g],m=i[g];m!==void 0&&(x.normalized=m)}u(p)},a,c,pe,h)})})}}class Zs{constructor(){this.name=I.KHR_TEXTURE_TRANSFORM}extendTexture(t,n){return(n.texCoord===void 0||n.texCoord===t.channel)&&n.offset===void 0&&n.rotation===void 0&&n.scale===void 0||(t=t.clone(),n.texCoord!==void 0&&(t.channel=n.texCoord),n.offset!==void 0&&t.offset.fromArray(n.offset),n.rotation!==void 0&&(t.rotation=n.rotation),n.scale!==void 0&&t.repeat.fromArray(n.scale),t.needsUpdate=!0),t}}class Js{constructor(){this.name=I.KHR_MESH_QUANTIZATION}}class bn extends ns{constructor(t,n,e,s){super(t,n,e,s)}copySampleValue_(t){const n=this.resultBuffer,e=this.sampleValues,s=this.valueSize,o=t*s*3+s;for(let r=0;r!==s;r++)n[r]=e[o+r];return n}interpolate_(t,n,e,s){const o=this.resultBuffer,r=this.sampleValues,a=this.valueSize,i=a*2,c=a*3,d=s-n,u=(e-n)/d,h=u*u,p=h*u,g=t*c,x=g-c,m=-2*p+3*h,y=p-h,w=1-m,R=y-h+u;for(let v=0;v!==a;v++){const P=r[x+v+a],M=r[x+v+i]*d,b=r[g+v+a],z=r[g+v]*d;o[v]=w*P+R*M+m*b+y*z}return o}}const $s=new ct;class eo extends bn{interpolate_(t,n,e,s){const o=super.interpolate_(t,n,e,s);return $s.fromArray(o).normalize().toArray(o),o}}const te={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Be={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Jt={9728:Tt,9729:dt,9984:jn,9985:Gn,9986:zn,9987:un},$t={33071:Vn,33648:Kn,10497:Mt},xt={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ct={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xe={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},to={CUBICSPLINE:void 0,LINEAR:hn,STEP:$n},bt={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function no(f){return f.DefaultMaterial===void 0&&(f.DefaultMaterial=new q({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ts})),f.DefaultMaterial}function Re(f,t,n){for(const e in n.extensions)f[e]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[e]=n.extensions[e])}function fe(f,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(f.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function so(f,t,n){let e=!1,s=!1,o=!1;for(let c=0,d=t.length;c<d;c++){const u=t[c];if(u.POSITION!==void 0&&(e=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(o=!0),e&&s&&o)break}if(!e&&!s&&!o)return Promise.resolve(f);const r=[],a=[],i=[];for(let c=0,d=t.length;c<d;c++){const u=t[c];if(e){const h=u.POSITION!==void 0?n.getDependency("accessor",u.POSITION):f.attributes.position;r.push(h)}if(s){const h=u.NORMAL!==void 0?n.getDependency("accessor",u.NORMAL):f.attributes.normal;a.push(h)}if(o){const h=u.COLOR_0!==void 0?n.getDependency("accessor",u.COLOR_0):f.attributes.color;i.push(h)}}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(i)]).then(function(c){const d=c[0],u=c[1],h=c[2];return e&&(f.morphAttributes.position=d),s&&(f.morphAttributes.normal=u),o&&(f.morphAttributes.color=h),f.morphTargetsRelative=!0,f})}function oo(f,t){if(f.updateMorphTargets(),t.weights!==void 0)for(let n=0,e=t.weights.length;n<e;n++)f.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){const n=t.extras.targetNames;if(f.morphTargetInfluences.length===n.length){f.morphTargetDictionary={};for(let e=0,s=n.length;e<s;e++)f.morphTargetDictionary[n[e]]=e}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ro(f){let t;const n=f.extensions&&f.extensions[I.KHR_DRACO_MESH_COMPRESSION];if(n?t="draco:"+n.bufferView+":"+n.indices+":"+yt(n.attributes):t=f.indices+":"+yt(f.attributes)+":"+f.mode,f.targets!==void 0)for(let e=0,s=f.targets.length;e<s;e++)t+=":"+yt(f.targets[e]);return t}function yt(f){let t="";const n=Object.keys(f).sort();for(let e=0,s=n.length;e<s;e++)t+=n[e]+":"+f[n[e]]+";";return t}function St(f){switch(f){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function io(f){return f.search(/\.jpe?g($|\?)/i)>0||f.search(/^data\:image\/jpeg/)===0?"image/jpeg":f.search(/\.webp($|\?)/i)>0||f.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const ao=new ut;class co{constructor(t={},n={}){this.json=t,this.extensions={},this.plugins={},this.options=n,this.cache=new Ds,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let e=!1,s=!1,o=-1;typeof navigator<"u"&&(e=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,o=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||e||s&&o<98?this.textureLoader=new kn(this.options.manager):this.textureLoader=new Hn(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ln(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,n){const e=this,s=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([e.getDependencies("scene"),e.getDependencies("animation"),e.getDependencies("camera")])}).then(function(r){const a={scene:r[0][s.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:s.asset,parser:e,userData:{}};return Re(o,a,s),fe(a,s),Promise.all(e._invokeAll(function(i){return i.afterRoot&&i.afterRoot(a)})).then(function(){for(const i of a.scenes)i.updateMatrixWorld();t(a)})}).catch(n)}_markDefs(){const t=this.json.nodes||[],n=this.json.skins||[],e=this.json.meshes||[];for(let s=0,o=n.length;s<o;s++){const r=n[s].joints;for(let a=0,i=r.length;a<i;a++)t[r[a]].isBone=!0}for(let s=0,o=t.length;s<o;s++){const r=t[s];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(e[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(t,n){n!==void 0&&(t.refs[n]===void 0&&(t.refs[n]=t.uses[n]=0),t.refs[n]++)}_getNodeRef(t,n,e){if(t.refs[n]<=1)return e;const s=e.clone(),o=(r,a)=>{const i=this.associations.get(r);i!=null&&this.associations.set(a,i);for(const[c,d]of r.children.entries())o(d,a.children[c])};return o(e,s),s.name+="_instance_"+t.uses[n]++,s}_invokeOne(t){const n=Object.values(this.plugins);n.push(this);for(let e=0;e<n.length;e++){const s=t(n[e]);if(s)return s}return null}_invokeAll(t){const n=Object.values(this.plugins);n.unshift(this);const e=[];for(let s=0;s<n.length;s++){const o=t(n[s]);o&&e.push(o)}return e}getDependency(t,n){const e=t+":"+n;let s=this.cache.get(e);if(!s){switch(t){case"scene":s=this.loadScene(n);break;case"node":s=this._invokeOne(function(o){return o.loadNode&&o.loadNode(n)});break;case"mesh":s=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(n)});break;case"accessor":s=this.loadAccessor(n);break;case"bufferView":s=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(n)});break;case"buffer":s=this.loadBuffer(n);break;case"material":s=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(n)});break;case"texture":s=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(n)});break;case"skin":s=this.loadSkin(n);break;case"animation":s=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(n)});break;case"camera":s=this.loadCamera(n);break;default:if(s=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(t,n)}),!s)throw new Error("Unknown type: "+t);break}this.cache.add(e,s)}return s}getDependencies(t){let n=this.cache.get(t);if(!n){const e=this,s=this.json[t+(t==="mesh"?"es":"s")]||[];n=Promise.all(s.map(function(o,r){return e.getDependency(t,r)})),this.cache.add(t,n)}return n}loadBuffer(t){const n=this.json.buffers[t],e=this.fileLoader;if(n.type&&n.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+n.type+" buffer type is not supported.");if(n.uri===void 0&&t===0)return Promise.resolve(this.extensions[I.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(o,r){e.load($e.resolveURL(n.uri,s.path),o,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+n.uri+'".'))})})}loadBufferView(t){const n=this.json.bufferViews[t];return this.getDependency("buffer",n.buffer).then(function(e){const s=n.byteLength||0,o=n.byteOffset||0;return e.slice(o,o+s)})}loadAccessor(t){const n=this,e=this.json,s=this.json.accessors[t];if(s.bufferView===void 0&&s.sparse===void 0){const r=xt[s.type],a=Be[s.componentType],i=s.normalized===!0,c=new a(s.count*r);return Promise.resolve(new oe(c,r,i))}const o=[];return s.bufferView!==void 0?o.push(this.getDependency("bufferView",s.bufferView)):o.push(null),s.sparse!==void 0&&(o.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(o).then(function(r){const a=r[0],i=xt[s.type],c=Be[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*i,h=s.byteOffset||0,p=s.bufferView!==void 0?e.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let x,m;if(p&&p!==u){const y=Math.floor(h/p),w="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+y+":"+s.count;let R=n.cache.get(w);R||(x=new c(a,y*p,s.count*p/d),R=new Bn(x,p/d),n.cache.add(w,R)),m=new es(R,i,h%p/d,g)}else a===null?x=new c(s.count*i):x=new c(a,h,s.count*i),m=new oe(x,i,g);if(s.sparse!==void 0){const y=xt.SCALAR,w=Be[s.sparse.indices.componentType],R=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,P=new w(r[1],R,s.sparse.count*y),M=new c(r[2],v,s.sparse.count*i);a!==null&&(m=new oe(m.array.slice(),m.itemSize,m.normalized));for(let b=0,z=P.length;b<z;b++){const D=P[b];if(m.setX(D,M[b*i]),i>=2&&m.setY(D,M[b*i+1]),i>=3&&m.setZ(D,M[b*i+2]),i>=4&&m.setW(D,M[b*i+3]),i>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(t){const n=this.json,e=this.options,o=n.textures[t].source,r=n.images[o];let a=this.textureLoader;if(r.uri){const i=e.manager.getHandler(r.uri);i!==null&&(a=i)}return this.loadTextureImage(t,o,a)}loadTextureImage(t,n,e){const s=this,o=this.json,r=o.textures[t],a=o.images[n],i=(a.uri||a.bufferView)+":"+r.sampler;if(this.textureCache[i])return this.textureCache[i];const c=this.loadImageSource(n,e).then(function(d){d.flipY=!1,d.name=r.name||a.name||"",d.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(d.name=a.uri);const h=(o.samplers||{})[r.sampler]||{};return d.magFilter=Jt[h.magFilter]||dt,d.minFilter=Jt[h.minFilter]||un,d.wrapS=$t[h.wrapS]||Mt,d.wrapT=$t[h.wrapT]||Mt,s.associations.set(d,{textures:t}),d}).catch(function(){return null});return this.textureCache[i]=c,c}loadImageSource(t,n){const e=this,s=this.json,o=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const r=s.images[t],a=self.URL||self.webkitURL;let i=r.uri||"",c=!1;if(r.bufferView!==void 0)i=e.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const h=new Blob([u],{type:r.mimeType});return i=a.createObjectURL(h),i});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const d=Promise.resolve(i).then(function(u){return new Promise(function(h,p){let g=h;n.isImageBitmapLoader===!0&&(g=function(x){const m=new kt(x);m.needsUpdate=!0,h(m)}),n.load($e.resolveURL(u,o.path),g,void 0,p)})}).then(function(u){return c===!0&&a.revokeObjectURL(i),fe(u,r),u.userData.mimeType=r.mimeType||io(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",i),u});return this.sourceCache[t]=d,d}assignTexture(t,n,e,s){const o=this;return this.getDependency("texture",e.index).then(function(r){if(!r)return null;if(e.texCoord!==void 0&&e.texCoord>0&&(r=r.clone(),r.channel=e.texCoord),o.extensions[I.KHR_TEXTURE_TRANSFORM]){const a=e.extensions!==void 0?e.extensions[I.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const i=o.associations.get(r);r=o.extensions[I.KHR_TEXTURE_TRANSFORM].extendTexture(r,a),o.associations.set(r,i)}}return s!==void 0&&(r.colorSpace=s),t[n]=r,r})}assignFinalMaterial(t){const n=t.geometry;let e=t.material;const s=n.attributes.tangent===void 0,o=n.attributes.color!==void 0,r=n.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+e.uuid;let i=this.cache.get(a);i||(i=new Dt,mt.prototype.copy.call(i,e),i.color.copy(e.color),i.map=e.map,i.sizeAttenuation=!1,this.cache.add(a,i)),e=i}else if(t.isLine){const a="LineBasicMaterial:"+e.uuid;let i=this.cache.get(a);i||(i=new dn,mt.prototype.copy.call(i,e),i.color.copy(e.color),i.map=e.map,this.cache.add(a,i)),e=i}if(s||o||r){let a="ClonedMaterial:"+e.uuid+":";s&&(a+="derivative-tangents:"),o&&(a+="vertex-colors:"),r&&(a+="flat-shading:");let i=this.cache.get(a);i||(i=e.clone(),o&&(i.vertexColors=!0),r&&(i.flatShading=!0),s&&(i.normalScale&&(i.normalScale.y*=-1),i.clearcoatNormalScale&&(i.clearcoatNormalScale.y*=-1)),this.cache.add(a,i),this.associations.set(i,this.associations.get(e))),e=i}t.material=e}getMaterialType(){return q}loadMaterial(t){const n=this,e=this.json,s=this.extensions,o=e.materials[t];let r;const a={},i=o.extensions||{},c=[];if(i[I.KHR_MATERIALS_UNLIT]){const u=s[I.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(a,o,n))}else{const u=o.pbrMetallicRoughness||{};if(a.color=new Z(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],pe),a.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(n.assignTexture(a,"map",u.baseColorTexture,Pe)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(n.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(n.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(t,a)})))}o.doubleSided===!0&&(a.side=tt);const d=o.alphaMode||bt.OPAQUE;if(d===bt.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,d===bt.MASK&&(a.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&r!==se&&(c.push(n.assignTexture(a,"normalMap",o.normalTexture)),a.normalScale=new W(1,1),o.normalTexture.scale!==void 0)){const u=o.normalTexture.scale;a.normalScale.set(u,u)}if(o.occlusionTexture!==void 0&&r!==se&&(c.push(n.assignTexture(a,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&r!==se){const u=o.emissiveFactor;a.emissive=new Z().setRGB(u[0],u[1],u[2],pe)}return o.emissiveTexture!==void 0&&r!==se&&c.push(n.assignTexture(a,"emissiveMap",o.emissiveTexture,Pe)),Promise.all(c).then(function(){const u=new r(a);return o.name&&(u.name=o.name),fe(u,o),n.associations.set(u,{materials:t}),o.extensions&&Re(s,u,o),u})}createUniqueName(t){const n=Wn.sanitizeNodeName(t||"");return n in this.nodeNamesUsed?n+"_"+ ++this.nodeNamesUsed[n]:(this.nodeNamesUsed[n]=0,n)}loadGeometries(t){const n=this,e=this.extensions,s=this.primitiveCache;function o(a){return e[I.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,n).then(function(i){return en(i,a,n)})}const r=[];for(let a=0,i=t.length;a<i;a++){const c=t[a],d=ro(c),u=s[d];if(u)r.push(u.promise);else{let h;c.extensions&&c.extensions[I.KHR_DRACO_MESH_COMPRESSION]?h=o(c):h=en(new De,c,n),s[d]={primitive:c,promise:h},r.push(h)}}return Promise.all(r)}loadMesh(t){const n=this,e=this.json,s=this.extensions,o=e.meshes[t],r=o.primitives,a=[];for(let i=0,c=r.length;i<c;i++){const d=r[i].material===void 0?no(this.cache):this.getDependency("material",r[i].material);a.push(d)}return a.push(n.loadGeometries(r)),Promise.all(a).then(function(i){const c=i.slice(0,i.length-1),d=i[i.length-1],u=[];for(let p=0,g=d.length;p<g;p++){const x=d[p],m=r[p];let y;const w=c[p];if(m.mode===te.TRIANGLES||m.mode===te.TRIANGLE_STRIP||m.mode===te.TRIANGLE_FAN||m.mode===void 0)y=o.isSkinnedMesh===!0?new Yn(x,w):new F(x,w),y.isSkinnedMesh===!0&&y.normalizeSkinWeights(),m.mode===te.TRIANGLE_STRIP?y.geometry=qt(y.geometry,cn):m.mode===te.TRIANGLE_FAN&&(y.geometry=qt(y.geometry,wt));else if(m.mode===te.LINES)y=new Xn(x,w);else if(m.mode===te.LINE_STRIP)y=new fn(x,w);else if(m.mode===te.LINE_LOOP)y=new Qn(x,w);else if(m.mode===te.POINTS)y=new nt(x,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(y.geometry.morphAttributes).length>0&&oo(y,o),y.name=n.createUniqueName(o.name||"mesh_"+t),fe(y,o),m.extensions&&Re(s,y,m),n.assignFinalMaterial(y),u.push(y)}for(let p=0,g=u.length;p<g;p++)n.associations.set(u[p],{meshes:t,primitives:p});if(u.length===1)return o.extensions&&Re(s,u[0],o),u[0];const h=new be;o.extensions&&Re(s,h,o),n.associations.set(h,{meshes:t});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}loadCamera(t){let n;const e=this.json.cameras[t],s=e[e.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return e.type==="perspective"?n=new an(rn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):e.type==="orthographic"&&(n=new sn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),e.name&&(n.name=this.createUniqueName(e.name)),fe(n,e),Promise.resolve(n)}loadSkin(t){const n=this.json.skins[t],e=[];for(let s=0,o=n.joints.length;s<o;s++)e.push(this._loadNodeShallow(n.joints[s]));return n.inverseBindMatrices!==void 0?e.push(this.getDependency("accessor",n.inverseBindMatrices)):e.push(null),Promise.all(e).then(function(s){const o=s.pop(),r=s,a=[],i=[];for(let c=0,d=r.length;c<d;c++){const u=r[c];if(u){a.push(u);const h=new ut;o!==null&&h.fromArray(o.array,c*16),i.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',n.joints[c])}return new qn(a,i)})}loadAnimation(t){const n=this.json,e=this,s=n.animations[t],o=s.name?s.name:"animation_"+t,r=[],a=[],i=[],c=[],d=[];for(let u=0,h=s.channels.length;u<h;u++){const p=s.channels[u],g=s.samplers[p.sampler],x=p.target,m=x.node,y=s.parameters!==void 0?s.parameters[g.input]:g.input,w=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(r.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",y)),i.push(this.getDependency("accessor",w)),c.push(g),d.push(x))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(i),Promise.all(c),Promise.all(d)]).then(function(u){const h=u[0],p=u[1],g=u[2],x=u[3],m=u[4],y=[];for(let w=0,R=h.length;w<R;w++){const v=h[w],P=p[w],M=g[w],b=x[w],z=m[w];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const D=e._createAnimationTracks(v,P,M,b,z);if(D)for(let k=0;k<D.length;k++)y.push(D[k])}return new Zn(o,void 0,y)})}createNodeMesh(t){const n=this.json,e=this,s=n.nodes[t];return s.mesh===void 0?null:e.getDependency("mesh",s.mesh).then(function(o){const r=e._getNodeRef(e.meshCache,s.mesh,o);return s.weights!==void 0&&r.traverse(function(a){if(a.isMesh)for(let i=0,c=s.weights.length;i<c;i++)a.morphTargetInfluences[i]=s.weights[i]}),r})}loadNode(t){const n=this.json,e=this,s=n.nodes[t],o=e._loadNodeShallow(t),r=[],a=s.children||[];for(let c=0,d=a.length;c<d;c++)r.push(e.getDependency("node",a[c]));const i=s.skin===void 0?Promise.resolve(null):e.getDependency("skin",s.skin);return Promise.all([o,Promise.all(r),i]).then(function(c){const d=c[0],u=c[1],h=c[2];h!==null&&d.traverse(function(p){p.isSkinnedMesh&&p.bind(h,ao)});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}_loadNodeShallow(t){const n=this.json,e=this.extensions,s=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const o=n.nodes[t],r=o.name?s.createUniqueName(o.name):"",a=[],i=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return i&&a.push(i),o.camera!==void 0&&a.push(s.getDependency("camera",o.camera).then(function(c){return s._getNodeRef(s.cameraCache,o.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){a.push(c)}),this.nodeCache[t]=Promise.all(a).then(function(c){let d;if(o.isBone===!0?d=new Jn:c.length>1?d=new be:c.length===1?d=c[0]:d=new Pt,d!==c[0])for(let u=0,h=c.length;u<h;u++)d.add(c[u]);if(o.name&&(d.userData.name=o.name,d.name=r),fe(d,o),o.extensions&&Re(e,d,o),o.matrix!==void 0){const u=new ut;u.fromArray(o.matrix),d.applyMatrix4(u)}else o.translation!==void 0&&d.position.fromArray(o.translation),o.rotation!==void 0&&d.quaternion.fromArray(o.rotation),o.scale!==void 0&&d.scale.fromArray(o.scale);return s.associations.has(d)||s.associations.set(d,{}),s.associations.get(d).nodes=t,d}),this.nodeCache[t]}loadScene(t){const n=this.extensions,e=this.json.scenes[t],s=this,o=new be;e.name&&(o.name=s.createUniqueName(e.name)),fe(o,e),e.extensions&&Re(n,o,e);const r=e.nodes||[],a=[];for(let i=0,c=r.length;i<c;i++)a.push(s.getDependency("node",r[i]));return Promise.all(a).then(function(i){for(let d=0,u=i.length;d<u;d++)o.add(i[d]);const c=d=>{const u=new Map;for(const[h,p]of s.associations)(h instanceof mt||h instanceof kt)&&u.set(h,p);return d.traverse(h=>{const p=s.associations.get(h);p!=null&&u.set(h,p)}),u};return s.associations=c(o),o})}_createAnimationTracks(t,n,e,s,o){const r=[],a=t.name?t.name:t.uuid,i=[];xe[o.path]===xe.weights?t.traverse(function(h){h.morphTargetInfluences&&i.push(h.name?h.name:h.uuid)}):i.push(a);let c;switch(xe[o.path]){case xe.weights:c=Bt;break;case xe.rotation:c=zt;break;case xe.position:case xe.scale:c=Ht;break;default:switch(e.itemSize){case 1:c=Bt;break;case 2:case 3:default:c=Ht;break}break}const d=s.interpolation!==void 0?to[s.interpolation]:hn,u=this._getArrayFromAccessor(e);for(let h=0,p=i.length;h<p;h++){const g=new c(i[h]+"."+xe[o.path],n.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(t){let n=t.array;if(t.normalized){const e=St(n.constructor),s=new Float32Array(n.length);for(let o=0,r=n.length;o<r;o++)s[o]=n[o]*e;n=s}return n}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(e){const s=this instanceof zt?eo:bn;return new s(this.times,this.values,this.getValueSize()/3,e)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function lo(f,t,n){const e=t.attributes,s=new He;if(e.POSITION!==void 0){const a=n.json.accessors[e.POSITION],i=a.min,c=a.max;if(i!==void 0&&c!==void 0){if(s.set(new E(i[0],i[1],i[2]),new E(c[0],c[1],c[2])),a.normalized){const d=St(Be[a.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=t.targets;if(o!==void 0){const a=new E,i=new E;for(let c=0,d=o.length;c<d;c++){const u=o[c];if(u.POSITION!==void 0){const h=n.json.accessors[u.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(i.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),i.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),i.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){const x=St(Be[h.componentType]);i.multiplyScalar(x)}a.max(i)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}f.boundingBox=s;const r=new ss;s.getCenter(r.center),r.radius=s.min.distanceTo(s.max)/2,f.boundingSphere=r}function en(f,t,n){const e=t.attributes,s=[];function o(r,a){return n.getDependency("accessor",r).then(function(i){f.setAttribute(a,i)})}for(const r in e){const a=Ct[r]||r.toLowerCase();a in f.attributes||s.push(o(e[r],a))}if(t.indices!==void 0&&!f.index){const r=n.getDependency("accessor",t.indices).then(function(a){f.setIndex(a)});s.push(r)}return Gt.workingColorSpace!==pe&&"COLOR_0"in e&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Gt.workingColorSpace}" not supported.`),fe(f,t),lo(f,t,n),Promise.all(s).then(function(){return t.targets!==void 0?so(f,t.targets,n):f})}const tn=new E(0,.15,0),uo=new Ps;function fo(f,t){return new Promise((n,e)=>{uo.load("/birthday_cake.glb",s=>{const o=s.scene,r=new He().setFromObject(o),a=r.getSize(new E);r.getCenter(new E);const d=3.2/Math.max(a.x,a.y,a.z);o.scale.setScalar(d);const h=new He().setFromObject(o).getCenter(new E);o.position.sub(h);const p=new He().setFromObject(o);o.position.y-=p.min.y,f.add(o);const g=new Map;o.traverse(y=>{y.isMesh&&(y.castShadow=!0,y.receiveShadow=!0,g.set(y.uuid,y.material))});const x=po(o),m=mo();nn(o,m),n({model:o,gltf:s,candlePosition:x,applyWireframe:()=>nn(o,m),restoreOriginalMaterials:()=>go(o,g)})},s=>{t&&s.total&&t(s.loaded/s.total)},s=>{console.error("GLTFLoader error:",s),e(s)})})}const ho=["candle","wick","flame","bougie","mèche","bougies","mech"];function po(f){let t=null,n=-1/0;if(f.traverse(o=>{const r=o.name.toLowerCase();if(!ho.some(c=>r.includes(c)))return;const i=new E;o.getWorldPosition(i),i.y>n&&(n=i.y,t=o)}),t){const o=new He().setFromObject(t),r=new E((o.min.x+o.max.x)/2,o.max.y,(o.min.z+o.max.z)/2);return console.info(`[cake] Candle detected: "${t.name}" → top`,r),r.add(tn)}const e=new He().setFromObject(f),s=new E((e.min.x+e.max.x)/2,e.max.y,(e.min.z+e.max.z)/2).add(tn);return console.info("[cake] No candle node found — using model top-centre fallback:",s),s}function mo(){return new se({color:16720384,wireframe:!0,transparent:!0,opacity:.85})}function nn(f,t){f.traverse(n=>{n.isMesh&&(n.material=t)})}function go(f,t){f.traverse(n=>{n.isMesh&&t.has(n.uuid)&&(n.material=t.get(n.uuid))})}function xo(){var f=64,t=document.createElement("canvas");t.width=f,t.height=f;var n=t.getContext("2d"),e=f/2,s=f/2,o=n.createRadialGradient(e,s,0,e,s,12);o.addColorStop(0,"rgba(255, 200, 100, 0.3)"),o.addColorStop(.5,"rgba(255, 150, 50, 0.15)"),o.addColorStop(1,"rgba(255, 100, 0, 0)"),n.fillStyle=o,n.fillRect(0,0,f,f);var r=n.createRadialGradient(e,s,0,e,s,8);r.addColorStop(0,"rgba(255, 200, 80, 0.9)"),r.addColorStop(.6,"rgba(255, 180, 50, 0.6)"),r.addColorStop(1,"rgba(255, 150, 30, 0)"),n.fillStyle=r,n.fillRect(0,0,f,f);var a=n.createRadialGradient(e,s,0,e,s,4);a.addColorStop(0,"rgba(255, 255, 255, 1)"),a.addColorStop(.5,"rgba(255, 255, 220, 0.9)"),a.addColorStop(1,"rgba(255, 240, 180, 0)"),n.fillStyle=a,n.beginPath(),n.arc(e,s,4,0,Math.PI*2),n.fill();var i=new pt(t);return i.minFilter=dt,i.magFilter=dt,i}function bo(f){var t=xo(),n=new ft({map:t,transparent:!0,depthWrite:!1,blending:et}),e=new ht(n);e.scale.set(.25,.25,.25),e.visible=!1,f.add(e);var s=new lt(16746496,2,1.5);e.add(s);for(var o=120,r=new De,a=new Float32Array(o*3),i=new Float32Array(o),c=new Float32Array(o),d=new Float32Array(o*3),u=new Float32Array(o*3),h=0;h<o;h++)i[h]=999,c[h]=1;r.setAttribute("position",new oe(a,3)),r.setAttribute("age",new oe(i,1)),r.setAttribute("size",new oe(c,1)),r.setAttribute("color",new oe(d,3));var p=new he({uniforms:{time:{value:0}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:et,vertexColors:!0}),g=new nt(r,p);g.frustumCulled=!1,f.add(g);var x=0,m=!1,y=new E,w=new E(0,0,1);function R(C,_){e.position.copy(C),e.visible=!0,g.visible=!0,m=!0,y.copy(C),_&&w.copy(_).normalize();for(var H=0;H<o;H++)i[H]=999}function v(C){C.lengthSq()>1e-4&&w.copy(C).normalize()}function P(C){e.scale.setScalar(C*.25)}function M(C,_){var H=e.scale.x;return S.to({t:0},{t:1,duration:_,ease:"power2.inOut",onUpdate:function(){var L=this.targets()[0].t,N=H+(C*.25-H)*L;e.scale.setScalar(N)}})}function b(){m=!1,e.visible=!1,g.visible=!1}function z(C){if(m){var _=e.position;w.subVectors(_,y),w.lengthSq()>1e-4&&w.normalize(),y.copy(_)}}function D(C,_){if(!m)return;const H=e.position,L=r.attributes.position.array,N=r.attributes.age.array,X=r.attributes.size.array,G=r.attributes.color.array,Q=u;for(let A=0;A<o;A++)if(N[A]<999){if(N[A]+=C/.5,N[A]>=1){N[A]=999;continue}L[A*3+0]+=Q[A*3+0],L[A*3+1]+=Q[A*3+1],L[A*3+2]+=Q[A*3+2];const B=Math.sin(_*20+A*.7)*.003;L[A*3+0]+=B,L[A*3+1]+=B*.5;const j=N[A];if(j<.2){const K=j/.2;G[A*3+0]=1,G[A*3+1]=.95-K*.2,G[A*3+2]=.7-K*.4}else if(j<.5){const K=(j-.2)/.3;G[A*3+0]=1,G[A*3+1]=.75-K*.25,G[A*3+2]=.3-K*.3}else{const K=(j-.5)/.5;G[A*3+0]=1-K*.3,G[A*3+1]=.5-K*.5,G[A*3+2]=0}}for(let A=0;A<10;A++){x=(x+1)%o,L[x*3+0]=H.x-w.x*.02+(Math.random()-.5)*.008,L[x*3+1]=H.y-w.y*.02+(Math.random()-.5)*.008,L[x*3+2]=H.z-w.z*.02+(Math.random()-.5)*.008;const B=.06+Math.random()*.04,j=Math.random()<.95?1:.5,K=.008;Q[x*3+0]=-w.x*B*j+(Math.random()-.5)*K,Q[x*3+1]=-w.y*B*j+(Math.random()-.5)*K,Q[x*3+2]=-w.z*B*j+(Math.random()-.5)*K,N[x]=0,X[x]=3+Math.random()*4,G[x*3+0]=1,G[x*3+1]=.95,G[x*3+2]=.7}r.attributes.position.needsUpdate=!0,r.attributes.age.needsUpdate=!0,r.attributes.size.needsUpdate=!0,r.attributes.color.needsUpdate=!0}function k(C,_,H,L){var N={x:e.position.x,y:e.position.y,z:e.position.z};return S.to(N,{x:C.x,y:C.y,z:C.z,duration:_,ease:"power2.in",onUpdate:function(){e.position.set(N.x,N.y,N.z),H&&H(N)},onComplete:L})}function U(C,_){const H=n.color.clone(),L=new Z(C);return S.to({t:0},{t:1,duration:_,ease:"power2.inOut",onUpdate:function(){const N=this.targets()[0].t,X=H.clone().lerp(L,N);n.color.copy(X),s.color.copy(X)}})}return{mesh:e,light:s,activate:R,deactivate:b,update:z,updateParticles:D,flyTo:k,setColor:U,setScale:P,animateScale:M,setDirection:v}}function yo(f){const n=new De,e=new Float32Array(2e3*3),s=new Float32Array(2e3*3);for(let c=0;c<2e3;c++)e[c*3+0]=(Math.random()-.5)*20,e[c*3+1]=Math.random()*10,e[c*3+2]=(Math.random()-.5)*20,s[c*3+0]=(Math.random()-.5)*.003,s[c*3+1]=(Math.random()-.5)*.0015,s[c*3+2]=(Math.random()-.5)*.003;n.setAttribute("position",new oe(e,3));const o=new Dt({color:16724736,size:.045,transparent:!0,opacity:.55,sizeAttenuation:!0,depthWrite:!1}),r=new nt(n,o);r.frustumCulled=!1,f.add(r);function a(){const c=n.attributes.position.array;for(let d=0;d<2e3;d++)c[d*3+0]+=s[d*3+0],c[d*3+1]+=s[d*3+1],c[d*3+2]+=s[d*3+2],c[d*3+1]>10&&(c[d*3+1]=0),c[d*3+1]<0&&(c[d*3+1]=10);n.attributes.position.needsUpdate=!0}function i(){S.to(o,{opacity:0,duration:2,delay:.5})}return{points:r,update:a,transitionToPhase2:i}}function To(f,t){const e=new De,s=new Float32Array(320*3),o=[];for(let h=0;h<320;h++){s[h*3+0]=t.x,s[h*3+1]=t.y,s[h*3+2]=t.z;const p=Math.random()*Math.PI*2,g=Math.random()*Math.PI,x=.04+Math.random()*.1;o.push(new E(Math.sin(g)*Math.cos(p)*x,Math.cos(g)*x*1.3,Math.sin(g)*Math.sin(p)*x))}e.setAttribute("position",new oe(s,3));const r=[16772608,16746496,16729224,16777215,8978431],a=new Dt({color:r[Math.floor(Math.random()*r.length)],size:.1,transparent:!0,opacity:1,sizeAttenuation:!0,depthWrite:!1}),i=new nt(e,a);i.frustumCulled=!1,f.add(i);let c=1,d=!1;function u(){if(d)return;if(c-=.018,c<=0){d=!0,f.remove(i),e.dispose(),a.dispose();return}a.opacity=Math.max(0,c);const h=e.attributes.position.array;for(let p=0;p<320;p++)h[p*3+0]+=o[p].x,h[p*3+1]+=o[p].y,h[p*3+2]+=o[p].z,o[p].y-=.0025;e.attributes.position.needsUpdate=!0}return{update:u,isDisposed:()=>d}}function wo(f){const n=new pn(.1,.1),e=new se({color:16777215,side:tt}),s=new At(n,e,400),o=new Pt,r=[16729190,4491519,4517512,16746564,16763904],a=[];for(let u=0;u<400;u++){const h=(Math.random()-.5)*16,p=5+Math.random()*8,g=(Math.random()-.5)*14;a.push({x:h,y:p,z:g,rx:Math.random()*Math.PI,ry:Math.random()*Math.PI,rz:Math.random()*Math.PI,vx:(Math.random()-.5)*.02,vy:-.015-Math.random()*.02,vrx:(Math.random()-.5)*.1,vry:(Math.random()-.5)*.1,color:new Z(r[Math.floor(Math.random()*r.length)])}),s.setColorAt(u,a[u].color)}s.instanceColor.needsUpdate=!0,s.visible=!1,f.add(s);const i=500,c=new At(n,e,i);for(let u=0;u<i;u++)o.position.set((Math.random()-.5)*12,.01+Math.random()*.02,(Math.random()-.5)*12),o.rotation.set(Math.PI/2,0,Math.random()*Math.PI),o.updateMatrix(),c.setMatrixAt(u,o.matrix),c.setColorAt(u,new Z(r[Math.floor(Math.random()*r.length)]));c.instanceColor.needsUpdate=!0,c.visible=!1,f.add(c);let d=!1;return{activate(){d=!0,s.visible=!0,c.visible=!0},update(){if(d){for(let u=0;u<400;u++){const h=a[u];h.x+=h.vx,h.y+=h.vy,h.rx+=h.vrx,h.ry+=h.vry,h.y<-.5&&(h.y=8+Math.random()*4,h.x=(Math.random()-.5)*16),o.position.set(h.x,h.y,h.z),o.rotation.set(h.rx,h.ry,h.rz),o.updateMatrix(),s.setMatrixAt(u,o.matrix)}s.instanceMatrix.needsUpdate=!0}}}}function vo(f){const n=new De,e=new Float32Array(200*3),s=new Float32Array(200);for(let x=0;x<200;x++)e[x*3+0]=(Math.random()-.5)*16,e[x*3+1]=.5+Math.random()*9,e[x*3+2]=(Math.random()-.5)*16,s[x]=Math.random()*Math.PI*2;n.setAttribute("position",new oe(e,3)),n.setAttribute("phase",new oe(s,1));const o=new he({uniforms:{time:{value:0},color:{value:new Z(16766336)}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:et}),r=new nt(n,o);r.frustumCulled=!1,f.add(r);const a=new be,i=document.createElement("canvas");i.width=64,i.height=64;const c=i.getContext("2d");c.fillStyle="#ff6688",c.font="40px Arial",c.textAlign="center",c.textBaseline="middle",c.fillText("❤",32,32);const d=new pt(i),u=new ft({map:d,transparent:!0,opacity:0});for(let x=0;x<15;x++){const m=new ht(u);m.position.set((Math.random()-.5)*14,2+Math.random()*6,(Math.random()-.5)*14),m.scale.setScalar(.3+Math.random()*.3),m.userData={speedY:.01+Math.random()*.01,phase:Math.random()*10},a.add(m)}f.add(a);let h=!1;function p(){h=!0,S.to(o,{opacity:1,duration:2.5}),S.to(u,{opacity:.75,duration:2.5})}function g(x){h&&(o.uniforms.time.value=x,a.children.forEach(m=>{m.position.y+=m.userData.speedY,m.position.x+=Math.sin(x+m.userData.phase)*.005,m.position.y>10&&(m.position.y=0)}))}return{activate:p,update:g}}function Ao(f){const t=new os(2228224,.6);f.add(t);const n=new rs(1703936,0,.4);f.add(n);const e=new vt(16773344,0);e.position.set(4,10,6),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.near=.5,e.shadow.camera.far=30,e.shadow.camera.left=-8,e.shadow.camera.right=8,e.shadow.camera.top=8,e.shadow.camera.bottom=-8,e.shadow.bias=-.001,f.add(e);const s=new vt(5605631,0);s.position.set(-6,4,-6),f.add(s);const o=new lt(16750899,0,4);f.add(o);const r=[16755200,16746564,16742280,16763972,16750933],a=r.map((m,y)=>{const w=y/r.length*Math.PI*2,R=new lt(m,0,9);return R.position.set(Math.cos(w)*6,2.5,Math.sin(w)*6),f.add(R),R}),i=new is(14,72),c=new q({color:657930,roughness:.9,metalness:.05}),d=new F(i,c);d.rotation.x=-Math.PI/2,d.receiveShadow=!0,f.add(d);const u=Mo(f,r);function h(m){o.position.set(m.x,m.y+.08,m.z)}function p(){S.to(f.background,{r:.02,g:.01,b:.04,duration:2.5}),S.to(f.fog,{density:.018,duration:2.5}),S.to(c.color,{r:.07,g:.04,b:.1,duration:2.5}),S.to(t,{intensity:.9,duration:2.5}),S.to(t.color,{r:1,g:.95,b:.85,duration:2.5}),S.to(n,{intensity:1.2,duration:2.5}),S.to(n.color,{r:1,g:.85,b:.6,duration:2.5}),S.to(n.groundColor,{r:.08,g:.04,b:.1,duration:2.5}),S.to(e,{intensity:1.6,duration:2.5}),S.to(s,{intensity:.9,duration:2.5}),S.to(o,{intensity:2.8,duration:1.2}),a.forEach((y,w)=>{S.to(y,{intensity:1.2,duration:1.5,delay:.3+w*.15})}),u.reveal()}function g(m){o.intensity=2.8+Math.sin(m*9.7)*.4+Math.sin(m*17.3)*.2}function x(m){u.update(m)}return{ambientLight:t,hemiLight:n,dirLight:e,rimLight:s,candleLight:o,partyLights:a,floor:d,setCandlePosition:h,transitionToPhase2:p,updateCandleFlicker:g,updateBalloons:x}}function Mo(f,t){const n=[],e=[],s=[],o=new ee(1,32,32),r=new as(.1,.2,.3,8);[{x:-4.5,z:-3},{x:4.5,z:-2.5},{x:-5,z:1.5},{x:5,z:2}].forEach(M=>{const b=3+Math.floor(Math.random()*3);for(let z=0;z<b;z++){const D=t[Math.floor(Math.random()*t.length)],k=new q({color:D,roughness:.3,metalness:.1}),U=new be,C=new F(o,k);C.scale.set(.6,.75,.6),U.add(C);const _=new F(r,k);_.position.y=-.8,U.add(_);const H=new dn({color:16777215,transparent:!0,opacity:.3}),L=new De().setFromPoints([new E(0,-.8,0),new E(0,-4,0)]);U.add(new fn(L,H));const N=M.x+(Math.random()-.5)*1.5,X=M.z+(Math.random()-.5)*1.5,G=2+Math.random()*2.5;U.position.set(N,G-6,X),U.userData={targetY:G,phaseOffset:Math.random()*Math.PI*2,speed:.8+Math.random()*.5},f.add(U),n.push(U)}}),[{x:-3.5,z:-2.5},{x:-4.5,z:.5},{x:3.5,z:-2},{x:4.5,z:1},{x:-2,z:-3},{x:2.5,z:-2.8}].forEach(M=>{const b=.5+Math.random()*.6,z=new ke(b,b,b),D=t[Math.floor(Math.random()*t.length)],k=new q({color:D,roughness:.8}),U=new F(z,k),C=new q({color:16777215,roughness:.5}),_=new F(new ke(b+.02,b+.02,b*.2),C),H=new F(new ke(b*.2,b+.02,b+.02),C);U.add(_,H),U.position.set(M.x,b/2-5,M.z),U.userData={targetY:b/2},U.rotation.y=Math.random()*Math.PI,f.add(U),e.push(U)});const c=new be;c.position.y=8,c.visible=!1,f.add(c);const d=new Et([new E(-10,5.5,-5),new E(-5,4,-6),new E(0,5,-7),new E(5,4,-6),new E(10,5.5,-5)]),u=new q({color:1118481,roughness:.9});c.add(new F(new jt(d,64,.015,8,!1),u));const h=new ee(.08,8,8);for(let M=0;M<=30;M++){const b=d.getPoint(M/30),z=t[Math.floor(Math.random()*t.length)],D=new F(h,new q({color:16777215,emissive:z,emissiveIntensity:1.5}));D.position.copy(b),c.add(D)}const p=new be;p.position.y=8,p.visible=!1,f.add(p);const g=new Et([new E(-8,6.5,-3),new E(0,5.5,-4),new E(8,6.5,-3)]);p.add(new F(new jt(g,64,.01,8,!1),u));const x=new cs;x.moveTo(-.25,0).lineTo(.25,0).lineTo(0,-.6).lineTo(-.25,0);const m=new ls(x);for(let M=1;M<16;M++){const b=g.getPoint(M/16),z=g.getTangent(M/16),D=t[Math.floor(Math.random()*t.length)],k=new F(m,new q({color:D,roughness:.9,side:tt}));k.position.copy(b),k.lookAt(b.clone().add(z)),k.rotateY(Math.PI/2),p.add(k)}const y=new q({color:16119260,roughness:.9});new q({color:16777215,roughness:.8}),new q({color:16768928,roughness:.2,metalness:.8});const w=new q({color:16774630,roughness:.85,metalness:0}),R=new q({color:4863784,roughness:.7}),v=new q({color:16758465,roughness:.6});function P(M,b,z){const D=new be,k=new ee(.5,20,20),U=new F(k,w);U.scale.set(1.1,.9,.9),U.position.y=.35;const C=new ee(.3,16,16),_=new F(C,y);_.scale.set(1,.7,.6),_.position.set(0,.3,.35),D.add(_);const H=new ee(.4,20,20),L=new F(H,w);L.position.set(0,.95,.05);const N=new ee(.15,16,16),X=new F(N,w);X.position.set(-.3,1.2,.05);const G=new F(N,w);G.position.set(.3,1.2,.05);const Q=new ee(.08,12,12),A=new F(Q,v);A.position.set(-.3,1.18,.12);const B=new F(Q,v);B.position.set(.3,1.18,.12);const j=new ee(.18,16,16),K=new F(j,y);K.position.set(0,.88,.35),K.scale.set(1.1,.8,.9);const ce=new ee(.05,8,8),ne=new F(ce,R);ne.position.set(0,.92,.45),ne.scale.set(1,.8,.8);const ye=new ee(.05,8,8),Te=new q({color:1710618,roughness:.2,metalness:.3}),we=new F(ye,Te);we.position.set(-.15,.98,.32);const re=new F(ye,Te);re.position.set(.15,.98,.32);const ve=new ee(.015,6,6),Y=new se({color:16777215}),Le=new F(ve,Y);Le.position.set(-.12,1,.36);const Ae=new F(ve,Y);Ae.position.set(.18,1,.36);const Me=new Kt(.13,.25,12,12),ie=new F(Me,w);ie.position.set(-.45,.5,.2),ie.rotation.z=.3,ie.rotation.x=.8;const Ee=new F(Me,w);Ee.position.set(.45,.5,.2),Ee.rotation.z=-.3,Ee.rotation.x=.8;const st=new Kt(.15,.2,12,12),_e=new F(st,w);_e.position.set(-.3,.15,.45),_e.rotation.x=-.5,_e.rotation.z=.2;const Ce=new F(st,w);Ce.position.set(.3,.15,.45),Ce.rotation.x=-.5,Ce.rotation.z=-.2;const Ie=new ee(.05,8,8),me=new q({color:16765404,roughness:.7}),je=new F(Ie,me);je.position.set(-.3,.08,.6),je.scale.set(1,.5,.8);const Ke=new F(Ie,me);Ke.position.set(.3,.08,.6),Ke.scale.set(1,.5,.8);const ot=new ke(.2,.06,.06),Ve=new q({color:16739210,roughness:.4}),We=new F(ot,Ve);We.position.set(0,.65,.35);const Ne=new F(new ke(.12,.06,.04),Ve);Ne.position.set(-.12,.65,.35),Ne.rotation.z=.3;const Se=new F(new ke(.12,.06,.04),Ve);Se.position.set(.12,.65,.35),Se.rotation.z=-.3,D.add(U,L,X,G,A,B),D.add(K,ne,we,re,Le,Ae),D.add(ie,Ee,_e,Ce,je,Ke),D.add(We,Ne,Se);const Ye=0;D.position.set(M,Ye-5,b),D.rotation.y=z,D.userData={targetY:Ye},f.add(D),s.push(D)}return P(-3,1.5,.6),{reveal(){e.forEach((M,b)=>S.to(M.position,{y:M.userData.targetY,duration:1.2,delay:.4+b*.1,ease:"back.out(1.5)"})),s.forEach((M,b)=>S.to(M.position,{y:M.userData.targetY,duration:1.2,delay:.5+b*.08,ease:"back.out(1.5)"})),n.forEach((M,b)=>S.to(M.position,{y:M.userData.targetY,duration:1.5,delay:.6+b*.05,ease:"back.out(1.2)"})),c.visible=!0,p.visible=!0,S.to(c.position,{y:0,duration:2,ease:"power2.out",delay:.3}),S.to(p.position,{y:0,duration:2,ease:"power2.out",delay:.5})},update(M){n.forEach(b=>b.position.y=b.userData.targetY+Math.sin(M*b.userData.speed+b.userData.phaseOffset)*.3)}}}function Eo(f){const t=document.createElement("style");t.textContent=`
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
  `,f.appendChild(n);const e=document.createElement("div");e.id="interactive-hints",e.innerHTML=`
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
  `,f.appendChild(e);let s=null;const o=n.querySelector("#ready-btn");o.addEventListener("click",()=>{s&&(o.disabled=!0,s())});function r(){return new Promise(c=>{S.to(n,{opacity:0,duration:.9,ease:"power2.in",onComplete(){n.style.pointerEvents="none",n.style.display="none",c()}})})}function a(c){s=c}function i(){S.to(e,{opacity:1,duration:1.5,ease:"power2.out"})}return{overlay:n,hide:r,onReady:a,showInteractiveHints:i}}function Co(f){const t=new pn(200,200),n=new se({color:16777215,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:tt}),e=new F(t,n);e.renderOrder=999,e.frustumCulled=!1,f.add(e);function s(o){const r=new E;return o.getWorldDirection(r),e.position.copy(o.position).addScaledVector(r,.6),e.quaternion.copy(o.quaternion),S.timeline().to(n,{opacity:1,duration:.12,ease:"power4.out"}).to(n,{opacity:0,duration:1.6,ease:"power3.out"})}return{mesh:e,mat:n,trigger:s}}function So(f){const t=new us(.5,.06,10,80),n=new se({color:16775372,transparent:!0,opacity:0,side:tt,depthWrite:!1}),e=new F(t,n);e.rotation.x=Math.PI/2,f.add(e);function s(o){return e.position.copy(o),e.scale.setScalar(.01),n.opacity=1,S.timeline().to(e.scale,{x:25,y:25,z:25,duration:1.8,ease:"power2.out"}).to(n,{opacity:0,duration:1.8,ease:"power2.in"},"<")}return{mesh:e,mat:n,trigger:s}}function Ro(f){const t=document.createElement("canvas");t.width=1600,t.height=600;const n=t.getContext("2d");n.clearRect(0,0,t.width,t.height),n.textAlign="center",n.textBaseline="middle";const e="HAPPY BIRTHDAY",s="Thanh Tuyền",o=t.width/2,r=t.height*.38,a=t.height*.75;n.font='bold 130px "Outfit", Arial, sans-serif',n.fillStyle="#ffffff",n.shadowColor="rgba(255, 150, 80, 0.6)",n.shadowBlur=20,n.fillText(e,o,r),n.shadowColor="rgba(255, 100, 50, 0.5)",n.shadowBlur=50,n.fillText(e,o,r),n.font='700 120px "Dancing Script", cursive',n.fillStyle="#ff4d6d",n.shadowColor="rgba(255, 77, 109, 0.5)",n.shadowBlur=12,n.fillText(s,o,a),n.shadowColor="rgba(255, 77, 109, 0.3)",n.shadowBlur=25,n.fillText(s,o,a);const i=new pt(t);i.colorSpace=Pe;const c=new ft({map:i,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1}),d=new ht(c),u=7.5,h=u*(t.height/t.width);d.scale.set(u,h,1);const p=4.2;d.position.set(0,p,-1),d.visible=!1,f.add(d);let g=!1;return{sprite:d,mat:c,show(x=2){d.visible=!0,S.to(c,{opacity:1,duration:x,ease:"power2.inOut"})},hide(x=1){S.to(c,{opacity:0,duration:x,onComplete:()=>{d.visible=!1}})},update(x,m){if(!g&&d.visible&&(g=!0),!!g&&(d.position.y=p+Math.sin(x*1.5)*.15,m)){d.lookAt(m.position);const y=m.position.distanceTo(d.position),w=m.fov*Math.PI/180,P=2*Math.tan(w/2)*y*m.aspect*.85;let M=1;u>P&&(M=P/u),d.scale.set(u*M,h*M,1)}}}}function Po(f,t){const s=document.createElement("canvas");s.width=80,s.height=160;const o=s.getContext("2d");function r(h){o.clearRect(0,0,80,160);const p=o.createRadialGradient(80/2,160*.65,4,80/2,160*.55,80*.55);p.addColorStop(0,"rgba(255,255,180,1)"),p.addColorStop(.25,`rgba(255,${160+h*20|0},40,0.85)`),p.addColorStop(.65,"rgba(255,80,10,0.3)"),p.addColorStop(1,"rgba(200,30,0,0)"),o.fillStyle=p,o.beginPath(),o.ellipse(80/2,160*.6,80*.38,160*.42,0,0,Math.PI*2),o.fill();const g=o.createRadialGradient(80/2,160*.68,1,80/2,160*.65,80*.2);g.addColorStop(0,"rgba(255,255,255,1)"),g.addColorStop(.5,"rgba(255,240,140,0.8)"),g.addColorStop(1,"rgba(255,180,60,0)"),o.fillStyle=g,o.beginPath(),o.ellipse(80/2,160*.68,80*.18,80*.24,0,0,Math.PI*2),o.fill()}r(0);const a=new pt(s),i=new ft({map:a,transparent:!0,opacity:0,blending:et,depthWrite:!1}),c=new ht(i);c.scale.set(.22,.44,1),c.position.copy(t),c.position.y+=.06,f.add(c);function d(){return S.to(i,{opacity:1,duration:.6,ease:"power2.out"})}function u(h){const p=Math.sin(h*14.3)*.5+.5;c.scale.x=.22+Math.sin(h*11.7)*.018,c.scale.y=.44+Math.sin(h*8.1)*.025,Math.floor(h*60)%4===0&&(r(p),a.needsUpdate=!0)}return{sprite:c,mat:i,show:d,update:u}}function Do(f){const t=document.createElement("div");return t.style.cssText=`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 8;
    background: radial-gradient(ellipse at center,
      transparent 45%,
      rgba(0,0,0,0.55) 100%
    );
  `,f.appendChild(t),t}function Lo(f){const{scene:t,camera:n,controls:e,bloomPass:s,spark:o,dust:r,confetti:a,bokeh:i,env:c,flash:d,energyWave:u,birthdayText:h,candleFlame:p,candlePosition:g,restoreOriginalMaterials:x,enableOrbit:m,explosionUpdaters:y,frDuration:w,onRevealComplete:R}=f,v=o.mesh.position.clone(),P=[v,new E(v.x+(g.x-v.x)*.3,v.y+(g.y-v.y)*.3+2,v.z+(g.z-v.z)*.3+2),new E(v.x+(g.x-v.x)*.7,v.y+(g.y-v.y)*.7+.5,v.z+(g.z-v.z)*.7-1),g],M=new Et(P);M.curveType="centripetal";const b=[];t.traverse(L=>{L.userData&&L.userData.targetY!==void 0&&L.userData.phaseOffset!==void 0&&(L.visible=!1,b.push(L))});const z=M.getTangent(0),D={x:v.x-z.x*3,y:v.y+2,z:v.z-z.z*3},k={x:v.x,y:v.y,z:v.z},U={intensity:0},C=S.timeline({defaults:{ease:"none"}}),_=Math.max(w-2,1.5);C.to(n.position,{x:D.x,y:D.y,z:D.z,duration:.15,ease:"power2.out",onUpdate(){n.lookAt(v)}});const H={progress:0};return C.to(H,{progress:1,duration:_,ease:"power2.inOut",onUpdate(){const L=H.progress,N=M.getPoint(L),X=(Math.random()-.5)*.08;k.x=N.x+X,k.y=N.y+X,k.z=N.z+X,o.mesh.position.set(k.x,k.y,k.z);const G=Math.max(0,L-.08),Q=M.getPoint(G),A=M.getTangent(G),B=2.5+(1-L)*2,j=1.8+(1-L)*.8;if(n.position.set(Q.x-A.x*B,Q.y+j,Q.z-A.z*B),Math.sqrt(n.position.x**2+n.position.z**2)<2){const ce=Math.atan2(n.position.z,n.position.x);n.position.x=Math.cos(ce)*2,n.position.z=Math.sin(ce)*2}n.position.x+=(Math.random()-.5)*U.intensity,n.position.y+=(Math.random()-.5)*U.intensity,n.position.z+=(Math.random()-.5)*U.intensity,n.lookAt(k.x,k.y,k.z)}}),C.to(U,{intensity:.08,duration:_,ease:"power2.in"},"<"),C.to(s,{strength:1.5,radius:.39,duration:_,ease:"power2.in"},"<"),C.call(()=>{o.setColor(16746496,_*.4)},[],"<"),C.call(()=>{o.setColor(16768324,_*.6)},[],"<"+_*.4),C.call(()=>{o.deactivate(),U.intensity=0,d.trigger(n),u.trigger(g);const L=To(t,g);y.push(L),S.to(s,{strength:3.5,radius:.8,duration:.3,ease:"power4.out"})}),C.call(()=>{x(),S.to(s,{strength:.35,radius:.3,threshold:.4,duration:2.5,ease:"power2.out"}),c.transitionToPhase2(),b.forEach(L=>{L.visible=!0}),p.show(),a.activate(),i.activate(),r.transitionToPhase2(),R&&R()}),C.call(()=>{h.show()},[],"+=1.5"),C.to({},{duration:.5}),C.to(n.position,{x:0,y:4.5,z:11.5,duration:3.8,ease:"power2.inOut",onUpdate(){n.lookAt(0,2.5,0)}}),C.to({},{duration:2.5}),C.call(()=>{n.lookAt(0,1.8,0),e.target.set(0,1.8,0),m()}),C}async function _o(){const f=document.getElementById("app");Do(f);const{scene:t,renderer:n}=As(f),{camera:e,controls:s}=Ss(n),{composer:o,bloomPass:r,bokehPass:a}=Ms(n,t,e),i=document.getElementById("loading-fill"),c=document.getElementById("loading-pct"),d=document.getElementById("loading-screen");let u;try{u=await fo(t,A=>{const B=Math.round(A*100);i&&(i.style.width=`${B}%`),c&&(c.textContent=`${B}%`)})}catch(A){console.error("Failed to load birthday_cake.glb:",A),c&&(c.textContent="Failed to load model.");return}d&&(d.classList.add("hidden"),setTimeout(()=>d.remove(),900));const{model:h,candlePosition:p,restoreOriginalMaterials:g}=u,x=new ds;e.add(x);const m=new fs,y=new Vt(x);let w=4;try{const A=await m.loadAsync("audio/fr.wav");y.setBuffer(A),y.setVolume(1),w=A.duration}catch(A){console.warn("Failed to load fr.wav:",A)}const R=new Vt(x);try{const A=await m.loadAsync("audio/hpbd.mp3");R.setBuffer(A),R.setVolume(0),R.setLoop(!0)}catch(A){console.warn("Failed to load hpbd.mp3:",A)}const v=Ao(t);v.setCandlePosition(p);const P=bo(t),M=yo(t),b=wo(t),z=vo(t),D=Co(t),k=So(t),U=Ro(t),C=Po(t,p),_=Eo(f);let H=!0,L=!1,N=Math.PI*.15;const X=new Rt,G=[];_.onReady(async()=>{H=!1;try{y.buffer&&y.play()}catch(Y){console.warn("Could not play fr.wav immediately:",Y)}const A=document.getElementById("ready-btn"),B=A?.closest(".ui-card"),j=B?.querySelector(".ui-heading"),K=B?.querySelector(".ui-eyebrow"),ce=B?.querySelector(".ui-hint"),ne=A?.querySelector(".btn-label"),ye=A?.querySelector(".btn-radial"),Te=A?.querySelectorAll(".sparkle");K&&S.to(K,{opacity:0,duration:.3,ease:"power2.out"}),j&&S.to(j,{opacity:0,duration:.3,ease:"power2.out"}),ce&&S.to(ce,{opacity:0,duration:.3,ease:"power2.out"}),Te&&Te.forEach(Y=>S.to(Y,{opacity:0,duration:.2})),await new Promise(Y=>setTimeout(Y,300)),ne&&(S.to(ne,{letterSpacing:"0em",scale:.3,duration:.3,ease:"power2.in"}),S.to(ne,{color:"rgb(255, 150, 50)",duration:.2,ease:"power2.in"}),S.to(ne,{color:"rgb(255, 220, 80)",duration:.2,delay:.2,ease:"power2.in"}),S.to(ne,{opacity:0,duration:.2,delay:.4,ease:"power2.in"})),await new Promise(Y=>setTimeout(Y,500));const we=new E;e.getWorldDirection(we);const re=new E;re.copy(e.position).addScaledVector(we,4),re.y+=.2;const ve=new E().copy(p).sub(re).normalize();P.activate(re,ve),P.setScale(2),P.mesh.material.color.setHex(16729088),P.light.color.setHex(16729088),P.light.intensity=4,S.to(P.mesh.scale,{x:3,y:3,z:3,duration:.15,ease:"power2.out",onComplete:()=>{S.to(P.mesh.scale,{x:1,y:1,z:1,duration:.2,ease:"power2.in"})}}),P.setColor(16746496,.15),setTimeout(()=>P.setColor(16768324,.2),150),A&&S.to(A,{opacity:0,scale:.5,duration:.3,ease:"power2.in",onComplete:()=>{A.style.display="none"}}),ye&&S.to(ye,{opacity:0,duration:.2}),S.to(document.getElementById("ui-overlay"),{opacity:0,duration:.3,ease:"power2.in",onComplete:()=>{const Y=document.getElementById("ui-overlay");Y&&(Y.style.pointerEvents="none",Y.style.display="none")}}),await new Promise(Y=>setTimeout(Y,350)),Lo({scene:t,camera:e,controls:s,bloomPass:r,spark:P,dust:M,confetti:b,bokeh:z,env:v,flash:D,energyWave:k,birthdayText:U,candleFlame:C,candlePosition:p,restoreOriginalMaterials:g,explosionUpdaters:G,frDuration:w,onRevealComplete:()=>{if(R.buffer){let Ae=function(){const Me=performance.now()-Y,ie=Math.min(Me/Le,1);R.setVolume(ie*.3),ie<1&&requestAnimationFrame(Ae)};R.play();const Y=performance.now(),Le=1e3;Ae()}},enableOrbit:()=>{L=!0,s.target.set(0,1.8,0),Rs(s),_.showInteractiveHints()}})});function Q(){requestAnimationFrame(Q);const A=Math.min(X.getDelta(),.05),B=X.elapsedTime;if(H){N+=.003;const j=8.5;e.position.x=Math.sin(N)*j,e.position.z=Math.cos(N)*j,e.position.y=3.5+Math.sin(B*.3)*.3,e.lookAt(0,1.5,0),h.rotation.y+=.003}P.update(B),P.updateParticles(A||.016,B),M.update(),b.update(),z.update(B);for(let j=G.length-1;j>=0;j--){const K=G[j];K.update(),K.isDisposed()&&G.splice(j,1)}if(H||(v.updateCandleFlicker(B),v.updateBalloons(B)),U.update(B,e),C.update(B),L&&s.update(),a){const j=e.position.distanceTo(new E(0,1.5,0));a.uniforms.focus.value=j}o.render()}Q()}_o();
