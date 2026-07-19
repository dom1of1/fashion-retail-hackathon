import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { hackathonApi, resolveImageUrl, formatPrice } from '../api/hackathon';
import { useCart } from '../context/CartContext';
import { generateTryOn } from '../utils/replicate';
import { fileToBase64 } from '../utils/imageUtils';
import LoadingOverlay from '../components/LoadingOverlay';

export default function TryOn() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const fileInputRef = useRef(null);

  const [item, setItem] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await hackathonApi.getItem(itemId);
        setItem(data);
      } catch (err) {
        console.error('Failed to load item:', err);
      } finally {
        setPageLoading(false);
      }
    }
    loadItem();
  }, [itemId]);

  const handleFileSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setUserImage(base64);
      setResultImage(null);
      setError(null);
    } catch (err) {
      setError('Failed to read image.');
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!userImage || !item) return;
    setLoading(true);
    setError(null);

    try {
      const clothImageUrl = resolveImageUrl(item.image_urls?.[0]);
      const result = await generateTryOn(userImage, clothImageUrl, 'upper_body');
      setResultImage(result);
    } catch (err) {
      setError(err.message || 'Try-on failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userImage, item]);

  const handleAddToCart = () => {
    if (!item) return;
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (pageLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 0' }}>
        <div className="loading-overlay__spinner" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="tryon-page">
        <p>Item not found.</p>
      </div>
    );
  }

  const clothImageUrl = resolveImageUrl(item.image_urls?.[0]);

  return (
    <div className="tryon-page">
      <Link to={`/product/${item.id}`} className="tryon-page__back">
        <ArrowLeft size={14} /> Back to {item.name}
      </Link>

      <h1 className="tryon-page__title">Virtual Try-On</h1>
      <p className="tryon-page__subtitle">
        Upload a photo of yourself to see how {item.name} looks on you.
      </p>

      {error && (
        <div className="error-message" role="alert">{error}</div>
      )}

      {!resultImage ? (
        <>
          <div className="tryon-page__grid">
            {/* Left: User Photo */}
            <div className="tryon-page__panel">
              <div className="tryon-page__panel-label">Your Photo</div>
              {userImage ? (
                <div className="preview">
                  <img src={userImage} alt="Your photo" className="preview__image" />
                  <button
                    className="preview__change"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div
                  className="upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-zone__label">Upload Photo</div>
                  <div className="upload-zone__subtext">Full-body photo works best</div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="upload-zone__input"
              />
            </div>

            {/* Right: Garment */}
            <div className="tryon-page__panel">
              <div className="tryon-page__panel-label">Garment</div>
              <div className="preview">
                <img src={clothImageUrl} alt={item.name} className="preview__image" />
              </div>
            </div>
          </div>

          <button
            className="btn btn--primary"
            style={{ width: '100%' }}
            onClick={handleGenerate}
            disabled={!userImage}
          >
            Generate Try-On
          </button>
        </>
      ) : (
        <>
          <div className="tryon-page__result">
            <div className="tryon-page__result-image">
              <img src={resultImage} alt="Try-on result" />
            </div>
          </div>

          <div className="tryon-page__actions">
            <button className="btn btn--primary" onClick={handleAddToCart}>
              <ShoppingBag size={16} />
              {added ? 'Added' : 'Add to Bag'}
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => {
                setResultImage(null);
                setUserImage(null);
              }}
            >
              Try Again
            </button>
          </div>
        </>
      )}

      {loading && <LoadingOverlay />}
    </div>
  );
}
