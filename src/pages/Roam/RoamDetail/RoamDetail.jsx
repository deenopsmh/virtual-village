import React, { useState, useEffect } from 'react';
import styles from './RoamDetail.module.css';

export default function RoamDetail({ activeNode }) {
  const [activeTab, setActiveTab] = useState('about'); // 'about' or 'interview'

  useEffect(() => {
    if (activeTab === 'interview' && !activeNode?.interview) {
      setActiveTab('about');
    }
  }, [activeNode, activeTab]);

  if (!activeNode) return null;

  const { name, description, about, interview } = activeNode;

  // Determine if the interview data exists and has content
  const hasInterview = !!(activeNode?.interview && activeNode.interview.subject);

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
          <h3 className={styles.locationTitle}>{name}</h3>
          <p className={styles.locationSub}>{description}</p>
        </div>

        {activeTab === 'about' || !hasInterview ? (
          <div className={styles.tabContentBlock}>
            <p className={styles.narrativeParagraph}>{about?.text}</p>
            
            {about?.todo && about.todo.length > 0 && (
              <div className={styles.todoSection}>
                <h4 className={styles.todoHeader}>Things to do here</h4>
                <ul className={styles.todoList}>
                  {about.todo.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
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
                <span className={styles.interviewLabel}>Interview · {name}</span>
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