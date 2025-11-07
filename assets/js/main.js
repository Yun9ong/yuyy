import { utils } from './utils.js';

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 主卡片渐入动画
  const mainCard = document.getElementById('main-card');
  if (mainCard) {
    utils.fadeIn(mainCard, 100);
  }
  
  // 社交链接顺序出现动画
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach((link, index) => {
    const delay = 300 + (index * 150);
    utils.fadeIn(link, delay);
  });
  
  // 联系按钮交互逻辑
  const contactButtons = document.querySelectorAll('.contact-btn');
  // 使用工具类批量绑定事件
  utils.on(contactButtons, 'click', function() {
    const content = this.getAttribute('data-content');
    const tooltip = this.getAttribute('data-tooltip');
    
    if (!content || !tooltip) return; // 校验参数
    
    utils.copyToClipboard(content).then(success => {
      if (success) {
        utils.showToast(`${tooltip}`); // 简化提示文本
      } else {
        utils.showToast('复制失败，请手动复制', 2000);
      }
    });

    // 按钮点击反馈（使用CSS类管理）
    this.classList.add('scale-active');
    setTimeout(() => {
      this.classList.remove('scale-active');
    }, 200);
  });
  
  // 联系按钮悬停效果（使用CSS类管理）
  utils.on(contactButtons, 'mouseenter', function() {
    this.classList.add('scale-hover');
  });
  
  utils.on(contactButtons, 'mouseleave', function() {
    this.classList.remove('scale-hover');
  });
  
  // 社交链接点击事件
  utils.on(socialLinks, 'click', (e) => {
    // 仅阻止内部按钮的默认行为（如QQ群链接）
    if (e.currentTarget.id === 'qq-group-link') {
      e.preventDefault();
    }
  });
});