"use client";

import { useEffect } from "react";

/**
 * Provider that cleans up browser extension modifications to prevent hydration mismatches
 * This handles:
 * - Attributes like bis_skin_checked from extensions like Bitwarden
 * - Script injections from browser extensions
 * - Suppresses hydration warnings in the console
 */
export default function HydrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Suppress hydration mismatch warnings in console
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out hydration warnings caused by browser extensions
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Hydration failed') ||
         args[0].includes('There was an error while hydrating') ||
         args[0].includes('Text content does not match') ||
         args[0].includes("server rendered HTML didn't match"))
      ) {
        // Check if it's related to browser extension attributes
        const errorStr = args.join(' ');
        if (
          errorStr.includes('bis_skin_checked') ||
          errorStr.includes('bis_use') ||
          errorStr.includes('chrome-extension://') ||
          errorStr.includes('moz-extension://')
        ) {
          // Suppress this error - it's from a browser extension
          return;
        }
      }
      // Allow all other errors through
      originalError.apply(console, args);
    };

    // Clean up browser extension attributes and injected elements
    const cleanBrowserExtensionModifications = () => {
      // Remove bis_skin_checked attributes
      const elements = document.querySelectorAll("[bis_skin_checked]");
      elements.forEach((el) => {
        el.removeAttribute("bis_skin_checked");
      });

      // Remove bis_use attributes
      const bisUseElements = document.querySelectorAll("[bis_use]");
      bisUseElements.forEach((el) => {
        el.removeAttribute("bis_use");
      });

      // Remove extension-injected scripts
      const extensionScripts = document.querySelectorAll(
        'script[src^="chrome-extension://"], script[src^="moz-extension://"]'
      );
      extensionScripts.forEach((script) => {
        // Only remove if it has extension attributes
        if (script.hasAttribute("data-dynamic-id") || script.hasAttribute("bis_use")) {
          script.remove();
        }
      });
    };

    // Run immediately
    cleanBrowserExtensionModifications();

    // Create a mutation observer to catch modifications added after initial cleanup
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Handle attribute changes
        if (mutation.type === "attributes") {
          const target = mutation.target as Element;
          if (mutation.attributeName === "bis_skin_checked") {
            target.removeAttribute("bis_skin_checked");
          }
          if (mutation.attributeName === "bis_use") {
            target.removeAttribute("bis_use");
          }
        }

        // Handle added nodes (new scripts)
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              // Remove extension-injected scripts
              if (
                element.tagName === "SCRIPT" &&
                (element.getAttribute("src")?.startsWith("chrome-extension://") ||
                  element.getAttribute("src")?.startsWith("moz-extension://") ||
                  element.hasAttribute("bis_use"))
              ) {
                element.remove();
              }
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["bis_skin_checked", "bis_use"],
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      // Restore original console.error
      console.error = originalError;
    };
  }, []);

  return <>{children}</>;
}
