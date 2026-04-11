import React, { useState } from 'react';
import { Download, RefreshCw, Upload, Link as LinkIcon, Play, Copy, Check, Settings, Palette, Type, Image as ImageIcon, Sliders } from 'lucide-react';

const AdvancedGradientGenerator = () => {
  // Default state
  const defaultState = {
    heading: 'Expert Accounting for Key Industries',
    subheading: 'Let Riley & Company show you how focused, industry-driven accounting support can empower your business.',
    buttonText: 'Learn More',
    gradientType: 'linear',
    angle: 135,
    colorStops: [
      { color: '#0a0e27', position: 0, opacity: 95 },
      { color: '#1e40af', position: 50, opacity: 70 },
      { color: '#3b82f6', position: 100, opacity: 40 }
    ],
    backgroundImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    imagePosition: 'center',
    imageSize: 'cover'
  };

  const [state, setState] = useState(defaultState);
  const [activeTab, setActiveTab] = useState('gradient');
  const [copied, setCopied] = useState(false);
  const [imageInput, setImageInput] = useState('');

  // Generate gradient CSS
  const generateGradientCSS = () => {
    const stops = state.colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => {
        const rgba = hexToRGBA(stop.color, stop.opacity / 100);
        return `${rgba} ${stop.position}%`;
      })
      .join(', ');

    if (state.gradientType === 'linear') {
      return `linear-gradient(${state.angle}deg, ${stops})`;
    } else {
      return `radial-gradient(circle at center, ${stops})`;
    }
  };

  // Hex to RGBA converter
  const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setState(prev => ({ ...prev, backgroundImage: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply image URL
  const applyImageURL = () => {
    if (imageInput.trim()) {
      setState(prev => ({ ...prev, backgroundImage: imageInput }));
      setImageInput('');
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setState(defaultState);
    setImageInput('');
  };

  // Copy CSS to clipboard
  const copyCSSCode = () => {
    const css = `background: ${state.gradientType}-gradient(${state.gradientType === 'linear' ? state.angle + 'deg, ' : 'circle at center, '}${state.colorStops.map(s => `${s.color} ${s.position}%`).join(', ')});`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Update color stop
  const updateColorStop = (index, field, value) => {
    const newStops = [...state.colorStops];
    newStops[index] = { ...newStops[index], [field]: value };
    setState(prev => ({ ...prev, colorStops: newStops }));
  };

  // Add color stop
  const addColorStop = () => {
    if (state.colorStops.length < 6) {
      const newStop = {
        color: '#6366f1',
        position: 50,
        opacity: 70
      };
      setState(prev => ({ ...prev, colorStops: [...prev.colorStops, newStop] }));
    }
  };

  // Remove color stop
  const removeColorStop = (index) => {
    if (state.colorStops.length > 2) {
      const newStops = state.colorStops.filter((_, i) => i !== index);
      setState(prev => ({ ...prev, colorStops: newStops }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      
      {/* Preview Section */}
      <div className="flex-1 relative">
        {/* Live Preview */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${state.backgroundImage})`,
            backgroundPosition: state.imagePosition,
            backgroundSize: state.imageSize
          }}
        >
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{ background: generateGradientCSS() }}
          />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                {state.heading}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed drop-shadow-md">
                {state.subheading}
              </p>
              <button className="group inline-flex items-center gap-3 bg-orange-600 hover:bg-slate-900 border-2 border-transparent hover:border-orange-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-orange-600/50 text-lg">
                <span>{state.buttonText}</span>
                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Bar - Copy Button */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={copyCSSCode}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all shadow-lg border border-white/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm font-medium">Copy CSS</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-96 bg-slate-900/95 backdrop-blur-xl overflow-y-auto border-l border-white/10 shadow-2xl">
        <div className="p-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-white">Gradient Studio</h2>
            </div>
            <p className="text-sm text-slate-400">Create professional gradients in real-time</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-slate-800/50 p-1 rounded-lg">
            {[
              { id: 'gradient', icon: Palette, label: 'Gradient' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'image', icon: ImageIcon, label: 'Image' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            
            {/* GRADIENT TAB */}
            {activeTab === 'gradient' && (
              <>
                {/* Gradient Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Gradient Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['linear', 'radial'].map(type => (
                      <button
                        key={type}
                        onClick={() => setState(prev => ({ ...prev, gradientType: type }))}
                        className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                          state.gradientType === type
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Angle Slider (Linear only) */}
                {state.gradientType === 'linear' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      Angle: <span className="text-orange-500">{state.angle}°</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={state.angle}
                      onChange={(e) => setState(prev => ({ ...prev, angle: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>
                )}

                {/* Color Stops */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-300">Color Stops</label>
                    <button
                      onClick={addColorStop}
                      disabled={state.colorStops.length >= 6}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      + Add Stop
                    </button>
                  </div>

                  <div className="space-y-4">
                    {state.colorStops.map((stop, index) => (
                      <div key={index} className="bg-slate-800/50 p-4 rounded-lg space-y-3 border border-slate-700/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-400">Stop {index + 1}</span>
                          {state.colorStops.length > 2 && (
                            <button
                              onClick={() => removeColorStop(index)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        {/* Color Picker */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Color</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={stop.color}
                              onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                              className="w-12 h-10 rounded-md cursor-pointer bg-slate-700 border border-slate-600"
                            />
                            <input
                              type="text"
                              value={stop.color}
                              onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                              className="flex-1 bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-md text-sm font-mono"
                            />
                          </div>
                        </div>

                        {/* Position Slider */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">
                            Position: <span className="text-orange-500">{stop.position}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={stop.position}
                            onChange={(e) => updateColorStop(index, 'position', parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                          />
                        </div>

                        {/* Opacity Slider */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">
                            Opacity: <span className="text-orange-500">{stop.opacity}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={stop.opacity}
                            onChange={(e) => updateColorStop(index, 'opacity', parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TEXT TAB */}
            {activeTab === 'text' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Heading</label>
                  <textarea
                    value={state.heading}
                    onChange={(e) => setState(prev => ({ ...prev, heading: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg resize-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Subheading</label>
                  <textarea
                    value={state.subheading}
                    onChange={(e) => setState(prev => ({ ...prev, subheading: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg resize-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Button Text</label>
                  <input
                    type="text"
                    value={state.buttonText}
                    onChange={(e) => setState(prev => ({ ...prev, buttonText: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {/* IMAGE TAB */}
            {activeTab === 'image' && (
              <>
                {/* URL Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                    <button
                      onClick={applyImageURL}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 rounded-lg transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-slate-400" />
                      <p className="text-xs text-slate-400">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Settings */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Background Size</label>
                  <select
                    value={state.imageSize}
                    onChange={(e) => setState(prev => ({ ...prev, imageSize: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Background Position</label>
                  <select
                    value={state.imagePosition}
                    onChange={(e) => setState(prev => ({ ...prev, imagePosition: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetToDefault}
            className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg border border-slate-700 hover:border-red-600"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Default
          </button>

          {/* CSS Output */}
          <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Generated CSS</span>
              <button onClick={copyCSSCode} className="text-xs text-orange-500 hover:text-orange-400">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="text-xs text-slate-300 font-mono break-all block">
              {generateGradientCSS()}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedGradientGenerator;
