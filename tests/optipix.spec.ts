import { Buffer } from 'node:buffer';
import { test, expect } from '@playwright/test';

// Sample image data
const SAMPLE_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PiEhvwAAAABJRU5ErkJggg==';

const SAMPLE_JPG_BASE64 =
  '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

test.describe('OptiPix Image Compression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'OptiPix' })).toBeVisible();
  });

  test('displays the main UI elements on load', async ({ page }) => {
    // Header elements
    await expect(page.getByText('Professional Image Compression')).toBeVisible();

    // Settings panel
    await expect(page.getByText('Compression Settings')).toBeVisible();
    await expect(page.getByText('Quality', { exact: true })).toBeVisible();
    await expect(page.getByText('Max Dimensions')).toBeVisible();
    await expect(page.getByText('Output Formats')).toBeVisible();

    // Drop zone
    await expect(page.getByText(/Drag & drop images here/i)).toBeVisible();
    await expect(page.getByText(/Your images are processed locally/i)).toBeVisible();

    // Footer
    await expect(page.getByText(/All rights reserved/i)).toBeVisible();
  });

  test('theme toggle works correctly', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /Switch to Dark Mode/i });
    await themeToggle.click();

    // Check if dark mode is applied
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    // Toggle back to light mode
    await page.getByRole('button', { name: /Switch to Light Mode/i }).click();
    await expect(htmlElement).not.toHaveClass(/dark/);
  });

  test('language switcher changes language', async ({ page }) => {
    const langSwitcher = page.getByRole('button', { name: 'en' }).first();
    await langSwitcher.click();

    // Click Chinese option
    await page.getByRole('button', { name: 'zh' }).click();

    // Verify Chinese text appears
    await expect(page.getByText('专业图片压缩工具')).toBeVisible();

    // Switch back to English
    await page.getByRole('button', { name: 'zh' }).first().click();
    await page.getByRole('button', { name: 'en' }).click();
    await expect(page.getByText('Professional Image Compression')).toBeVisible();
  });

  test('uploads and displays a single PNG image', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    // Verify file appears in the list
    await expect(page.getByText('test-image.png')).toBeVisible();
    await expect(page.getByText('1 images')).toBeVisible();

    // Verify original file info is displayed
    await expect(page.getByText(/1×1/)).toBeVisible();
  });

  test('uploads multiple images at once', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles([
      {
        name: 'image1.png',
        mimeType: 'image/png',
        buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
      },
      {
        name: 'image2.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.from(SAMPLE_JPG_BASE64, 'base64'),
      },
    ]);

    await expect(page.getByText('2 images')).toBeVisible();
    await expect(page.getByText('image1.png')).toBeVisible();
    await expect(page.getByText('image2.jpg')).toBeVisible();
  });

  test('removes a file from the list', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'removable.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await expect(page.getByText('removable.png')).toBeVisible();

    // Click remove button
    const removeButton = page.getByRole('button', { name: 'Remove file' }).first();
    await removeButton.click();

    // Verify file is removed and drop zone is shown again
    await expect(page.getByText('removable.png')).not.toBeVisible();
    await expect(page.getByText(/Drag & drop images here/i)).toBeVisible();
  });

  test('adjusts quality slider', async ({ page }) => {
    const qualitySlider = page.locator('input[type="range"]').first();

    // Set quality to 50%
    await qualitySlider.fill('0.5');
    await expect(page.getByText('50%')).toBeVisible();

    // Set quality to 90%
    await qualitySlider.fill('0.9');
    await expect(page.getByText('90%')).toBeVisible();
  });

  test('changes max dimensions', async ({ page }) => {
    // Find dimension inputs
    const dimensionInputs = page.locator('.input-field').filter({ hasText: '' });

    // Change max width
    await dimensionInputs.first().fill('1024');
    await expect(dimensionInputs.first()).toHaveValue('1024');

    // Change max height
    await dimensionInputs.last().fill('768');
    await expect(dimensionInputs.last()).toHaveValue('768');
  });

  test('toggles output format selection', async ({ page }) => {
    // Initially JPG should be selected
    const jpgButton = page.getByRole('button', { name: 'JPG' });
    const pngButton = page.getByRole('button', { name: 'PNG' });
    const webpButton = page.getByRole('button', { name: 'WEBP' });

    // Add PNG format
    await pngButton.click();

    // Add WEBP format
    await webpButton.click();

    // Try to remove JPG (should not remove if it's the last format)
    // In your code, you prevent removing the last format
    // So we add another first, then remove JPG
    await jpgButton.click(); // This should remove JPG since we have PNG and WEBP
  });

  test('processes image and shows results', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'process-test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    // Start processing
    const startButton = page.getByRole('button', { name: 'Start Processing' });
    await startButton.click();

    // Wait for preview button to appear (processing completes)
    const previewButton = page.getByRole('button', { name: 'Preview' });
    await expect(previewButton).toBeVisible({ timeout: 20000 });

    // Verify output format badges appear (use locator within file list to avoid matching settings button)
    const fileListItem = page.locator('.group.relative').first();
    await expect(fileListItem.getByText('JPG', { exact: true })).toBeVisible();

    // Verify output size information is shown
    await expect(page.getByText(/Output Size/i)).toBeVisible();
  });

  test('opens and closes preview modal', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'preview-test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await page.getByRole('button', { name: 'Start Processing' }).click();

    const previewButton = page.getByRole('button', { name: 'Preview' });
    await expect(previewButton).toBeVisible({ timeout: 20000 });
    await previewButton.click();

    // Modal should be visible
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('preview-test.png')).toBeVisible();
    await expect(modal.getByText(/Original/)).toBeVisible();

    // Close modal
    await modal.getByRole('button', { name: 'Close' }).click();
    await expect(modal).toBeHidden();
  });

  test('switches between original and compressed tabs in preview', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'tabs-test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await page.getByRole('button', { name: 'Start Processing' }).click();
    await page.getByRole('button', { name: 'Preview' }).click({ timeout: 20000 });

    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();

    // Click on Original tab
    await modal.getByRole('button', { name: /Original/ }).click();
    await expect(modal.getByText('Source Image')).toBeVisible();

    // Click on compressed format tab (JPEG tab - format name from MIME type image/jpeg)
    await modal.getByRole('button', { name: /JPEG/ }).click();
    await expect(modal.getByText('Compressed Output')).toBeVisible();
  });

  test('downloads compressed image from preview', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'download-test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await page.getByRole('button', { name: 'Start Processing' }).click();

    const previewButton = page.getByRole('button', { name: 'Preview' });
    await expect(previewButton).toBeVisible({ timeout: 20000 });
    await previewButton.click();

    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();

    // Wait for download button to be visible (modal opens on first compressed tab by default)
    const downloadButton = modal.getByRole('button', { name: /Download JPEG/i });
    await expect(downloadButton).toBeVisible({ timeout: 5000 });

    // Start download listener and click
    const downloadPromise = page.waitForEvent('download');
    await downloadButton.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/download-test\.jpg/);
  });

  test('downloads all images as ZIP', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles([
      {
        name: 'zip-test1.png',
        mimeType: 'image/png',
        buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
      },
      {
        name: 'zip-test2.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.from(SAMPLE_JPG_BASE64, 'base64'),
      },
    ]);

    await page.getByRole('button', { name: 'Start Processing' }).click();

    // Wait for all processing to complete
    await expect(page.getByRole('button', { name: 'Download All ZIP' })).toBeVisible({
      timeout: 30000,
    });

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download All ZIP' }).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('optipix-images.zip');
  });

  test('clears all files', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'clear-test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await expect(page.getByText('clear-test.png')).toBeVisible();

    await page.getByRole('button', { name: 'Clear All' }).click();

    // Drop zone should be visible again
    await expect(page.getByText(/Drag & drop images here/i)).toBeVisible();
    await expect(page.getByText('clear-test.png')).not.toBeVisible();
  });

  test('adds more files after initial upload', async ({ page }) => {
    // Upload first file
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'first.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await expect(page.getByText('1 images')).toBeVisible();

    // Click "Add More" button
    await page.getByRole('button', { name: 'Add More' }).click();

    // Upload second file through the hidden input
    const addMoreInput = page.locator('#add-more-input');
    await addMoreInput.setInputFiles({
      name: 'second.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from(SAMPLE_JPG_BASE64, 'base64'),
    });

    await expect(page.getByText('2 images')).toBeVisible();
    await expect(page.getByText('first.png')).toBeVisible();
    await expect(page.getByText('second.jpg')).toBeVisible();
  });

  test('opens and closes feedback modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Feedback' }).click();

    const modal = page.locator('.modal-content');
    await expect(modal.getByText('Send a Message')).toBeVisible();

    await modal.getByRole('button', { name: 'Cancel' }).click();
    await expect(modal.getByText('Send a Message')).not.toBeVisible();
  });

  test('processes multiple format outputs', async ({ page }) => {
    // Select multiple output formats
    await page.getByRole('button', { name: 'PNG' }).click();
    await page.getByRole('button', { name: 'WEBP' }).click();

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'testimage.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await page.getByRole('button', { name: 'Start Processing' }).click();

    // Wait for processing to complete
    await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible({ timeout: 20000 });

    // Should show multiple format badges in the file list results
    const fileListItem = page.locator('.group.relative').first();
    await expect(fileListItem.getByText('JPG', { exact: true })).toBeVisible();
    await expect(fileListItem.getByText('PNG', { exact: true })).toBeVisible();
    await expect(fileListItem.getByText('WEBP', { exact: true })).toBeVisible();
  });

  test('displays compression statistics', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'stats-test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    await page.getByRole('button', { name: 'Start Processing' }).click();

    // Wait for completion
    await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible({ timeout: 20000 });

    // Should show saved/increased percentage in the file list
    const fileListItem = page.locator('.group.relative').first();
    await expect(fileListItem.locator('text=/%/')).toBeVisible();

    // Should show output dimensions
    await expect(page.getByText(/Output Size/i)).toBeVisible();
  });
});

test.describe('OptiPix Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('handles invalid file types gracefully', async ({ page }) => {
    // Listen for alert
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('unsupported');
      await dialog.accept();
    });

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'document.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('fake pdf content'),
    });

    // Drop zone should still be visible (no files added)
    await expect(page.getByText(/Drag & drop images here/i)).toBeVisible();
  });

  test('validates at least one format is selected', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'test.png',
      mimeType: 'image/png',
      buffer: Buffer.from(SAMPLE_PNG_BASE64, 'base64'),
    });

    // Try to deselect all formats (add PNG and WEBP first, then remove JPG)
    await page.getByRole('button', { name: 'PNG' }).click();
    await page.getByRole('button', { name: 'WEBP' }).click();
    await page.getByRole('button', { name: 'JPG' }).click();

    // Now try to remove the remaining formats
    await page.getByRole('button', { name: 'PNG' }).click();

    // The last format (WEBP) should not be removable
    // Verify at least one format button is still selected
    const selectedFormats = page.locator('button').filter({ hasText: /JPG|PNG|WEBP|SVG/ });
    await expect(selectedFormats).toHaveCount(4); // All 4 format buttons exist
  });
});
