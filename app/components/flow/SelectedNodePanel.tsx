import React from 'react';
import { Node } from 'reactflow';
import styles from './SelectedNodePanel.module.css';

interface SelectedNodePanelProps {
  node: Node;
}

const SelectedNodePanel: React.FC<SelectedNodePanelProps> = ({ node }) => {
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsTitle}>Selected: {node.data.label}</div>
      <div className={styles.detailsContent}>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Type:</span>
          <span className={styles.detailsValue}>{node.data.type}</span>
        </div>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Level:</span>
          <span className={styles.detailsValue}>{node.data.level}</span>
        </div>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Children:</span>
          <span className={styles.detailsValue}>{node.data.childrenCount}</span>
        </div>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Collapsed:</span>
          <span className={styles.detailsValue}>{node.data.isCollapsed ? 'Yes' : 'No'}</span>
        </div>
        {node.data.description && (
          <div className={styles.detailsField}>
            <span className={styles.detailsLabel}>Description:</span>
            <span className={styles.detailsValue}>{node.data.description}</span>
          </div>
        )}
        {node.data.role && (
          <div className={styles.detailsField}>
            <span className={styles.detailsLabel}>Role:</span>
            <span className={styles.detailsValue}>{node.data.role}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedNodePanel; 