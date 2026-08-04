import React, { useState, useEffect } from 'react';
import styles from './RoamDetail.module.css';

export default function RoamDetail({
  activeNode,
  currentContext,
  currentActivities = [],
  breadcrumbPath = [],
  onHotspotClick,
  onBackOneLevel,
  canGoBack,
  // Split-view / junction state, shared with RoamViewer via Roam.js
  isSplitViewOpen,
  selectedOriginId,
  activeOriginPaths = [],
  onSelectPathChoice,
}) {
  const [activeTab, setActiveTab] = useState('about');

  const hasInterview = !!(currentContext?.interview && currentContext.interview.subject);

  useEffect(() => {
    if (activeTab === 'interview' && !hasInterview) {
      setActiveTab('about');
    }
  }, [currentContext, hasInterview, activeTab]);

  // At a junction: no single "scene" applies here, so show the path
  // choices instead of the usual about/interview panel.
  if (isSplitViewOpen) {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.contentBody}>
          <div className={styles.metaHeadings}>
            <span className={styles.locationLabel}>You are at</span>
            <h3 className={styles.locationTitle}>Point {selectedOriginId}</h3>
          </div>

          <div className={styles.tabContentBlock}>
            <p className={styles.narrativeParagraph}>
              This is a junction - pick a path to keep exploring.
            </p>

            <div className={styles.todoSection}>
              <h4 className={styles.todoHeader}>Available paths</h4>
              <ul className={styles.todoList}>
                {activeOriginPaths.map((item) => (
                  <li key={item.pathKey}>
                    <button
                      className={styles.todoItemButton}
                      onClick={() => onSelectPathChoice(item.pathKey)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!activeNode || !currentContext) return null;

  const currentLabel =
    breadcrumbPath.length > 0
      ? breadcrumbPath[breadcrumbPath.length - 1].label
      : activeNode.label;

  const previousLabel =
    breadcrumbPath.length > 1
      ? breadcrumbPath[breadcrumbPath.length - 2].label
      : activeNode.label;

  const { description, interview } = currentContext;

  // Filter out activities that do not exist in the currently selected era
  const availableActivities = currentActivities.filter(
    (item) => item.isAvailableInEra !== false
  );

  return (
    <div className={styles.detailsContainer}>

      <div className={`${styles.tabHeader} ${!hasInterview ? styles.singleTabHeader : ''}`}>
        <button
          className={`${styles.tabButton} ${activeTab === 'about' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About this place
        </button>

        {hasInterview && (
          <button
            className={`${styles.tabButton} ${activeTab === 'interview' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('interview')}
          >
            Interview
          </button>
        )}
      </div>

      <div className={styles.contentBody}>
        <div className={styles.metaHeadings}>
          <span className={styles.locationLabel}>You are at</span>
          <h3 className={styles.locationTitle}>{currentLabel}</h3>
        </div>

        {activeTab === 'about' || !hasInterview ? (
          <div className={styles.tabContentBlock}>
            <p className={styles.narrativeParagraph}>{description}</p>

            {(availableActivities.length > 0 || canGoBack) && (
              <div className={styles.todoSection}>
                <h4 className={styles.todoHeader}>Things to do here</h4>
                <ul className={styles.todoList}>
                  {availableActivities.map((item) => (
                    <li key={item.id}>
                      <button
                        className={styles.todoItemButton}
                        onClick={() => onHotspotClick(item)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}

                  {canGoBack && (
                    <li>
                      <button
                        className={styles.todoItemButton}
                        onClick={onBackOneLevel}
                      >
                        ← Return to {previousLabel}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.tabContentBlock}>

            <div className={styles.interviewProfile}>
              {interview.avatar && (
                <div
                  className={styles.avatarFrame}
                  style={{ backgroundImage: `url(${interview.avatar})` }}
                />
              )}
              <div className={styles.profileMeta}>
                {/* Fixed undefined variable 'label' -> 'currentLabel' */}
                <span className={styles.interviewLabel}>Interview · {currentLabel}</span>
                <h4 className={styles.subjectName}>{interview.subject}</h4>
                <span className={styles.subjectRole}>{interview.role}</span>
              </div>
            </div>

            <div className={styles.audioPlayerHud}>
              <button
                className={styles.playButton}
                onClick={() => alert('Audio Playback Engine Triggered')}
              >
                ▶
              </button>
              <div className={styles.waveformTrack}>
                <div className={styles.progressBar} style={{ width: '35%' }} />
              </div>
              <span className={styles.audioTimer}>0:42 / 2:18</span>
            </div>

            {interview.quote && (
              <blockquote className={styles.quoteBlock}>
                “{interview.quote}”
              </blockquote>
            )}
          </div>
        )}

      </div>
    </div>
  );
}