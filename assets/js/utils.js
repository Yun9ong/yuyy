/**
 * 工具函数库 - 增强健壮性和复用性
 */
export const utils = {
    /**
     * 显示提示框（支持动态创建，无需依赖预设DOM）
     * @param {string} message - 提示信息
     * @param {number} duration - 显示时长(ms)
     */
    showToast(message, duration = 3000) {
      // 尝试获取已有提示框，没有则动态创建
      let toast = document.getElementById('tooltip');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'tooltip';
        document.body.appendChild(toast);
      }
  
      toast.textContent = message;
      toast.classList.remove('opacity-0', 'invisible');
      toast.classList.add('opacity-100', 'visible');
  
      // 清除已有定时器，避免冲突
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.remove('opacity-100', 'visible');
        toast.classList.add('opacity-0', 'invisible');
      }, duration);
    },
  
    /**
     * 复制文本到剪贴板
     * @param {string} text - 要复制的文本
     * @returns {Promise<boolean>} - 复制成功返回true，失败返回false
     */
    async copyToClipboard(text) {
      if (!text) return false; // 空文本直接返回失败
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('复制失败:', err);
        // 降级方案：使用textarea模拟复制
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      }
    },
  
    /**
     * 添加元素渐入动画（确保初始状态正确）
     * @param {HTMLElement} element - 要添加动画的元素
     * @param {number} delay - 延迟时间(ms)
     */
    fadeIn(element, delay = 0) {
      if (!element) return; // 元素不存在直接返回
      // 确保初始状态正确
      element.classList.add('fade-in');
      setTimeout(() => {
        element.classList.remove('fade-in'); // 触发动画
      }, delay);
    },
  
    /**
     * 批量绑定事件（减少重复代码）
     * @param {NodeList} elements - 元素集合
     * @param {string} event - 事件名
     * @param {Function} handler - 事件处理函数
     */
    on(elements, event, handler) {
      if (!elements || !elements.forEach) return;
      elements.forEach(el => {
        el.addEventListener(event, handler);
      });
    }
  };